import { RefileDAO, StorageDAO } from '@dao'
import { toArrayAsync } from 'iterable-operator'
import { each } from 'extra-promise'
import * as crypto from 'crypto'
import { SplitHashValidator, NotMatchedError } from 'split-hash'
import { CustomError } from '@blackglory/errors'

export class FileAlreadyExists extends CustomError {}
export class ReferencesIsZero extends CustomError {}
export class IncorrectHashList extends CustomError {}
export class IncorrectFileHash extends CustomError {}

/**
 * @throws {FileAlreadyExists}
 * @throws {ReferencesIsZero}
 * @throws {IncorrectHashList}
 * @throws {IncorrectFileHash}
 */
export function uploadFile(
  hash: string
, hashList: string[]
, stream: NodeJS.ReadableStream
): Promise<void> {
  const KiB = 1024
  const HASH_BLOCK_SIZE = 512 * KiB

  return new Promise(async (resolve, reject) => {
    try {
      const info = await getFileInfo(hash)
      if (info.location !== null) throw new FileAlreadyExists()
      if (info.references === 0) throw new ReferencesIsZero()
      if (mergeHash(hashList) !== hash) throw new IncorrectHashList()

      // Note: there are stream/promises since Node.js v15.0.0
      const validatedStream = stream
        .pipe(createHashValidator(hashList))
        .on('error', err => {
          if (err instanceof NotMatchedError) {
            reject(new IncorrectFileHash())
          } else {
            reject(err)
          }
        })
      const location = await StorageDAO.saveFile(validatedStream)
      await RefileDAO.setFile(hash, location)
      resolve()
    } catch (e) {
      reject(e)
    }
  })

  function createHashValidator(hashList: string[]) {
    return new SplitHashValidator(hashList, HASH_BLOCK_SIZE, createHash)
  }

  function mergeHash(strArr: string[]): string {
    const hash = crypto.createHash('sha256')
    hash.update(strArr.join(''))
    return hash.digest('hex')
  }

  function createHash() {
    const hash = crypto.createHash('sha256')
    return {
      update(buffer: Buffer) {
        hash.update(buffer)
      }
    , digest() {
        return hash.digest('hex')
      }
    }
  }
}

export async function getFileInfo(hash: string): Promise<IFileInfo> {
  const location = RefileDAO.getFileLocation(hash)
  const references = RefileDAO.countReferences(hash)
  return {
    hash
  , location: await location
  , references: await references
  }
}

export function getAllNamespaces(): AsyncIterable<string> {
  return RefileDAO.getAllNamespaces()
}

export function getAllItemIds(namespace: string): AsyncIterable<string> {
  return RefileDAO.getAllItemIdsByNamespace(namespace)
}

export function getItemIdsByFile(
  namespace: string
, fileHash: string
): AsyncIterable<string> {
  return RefileDAO.getAllItemIdsByFileAndNamespace(fileHash, namespace)
}

export function getFileHashesByItem(
  namespace: string
, itemId: string
): AsyncIterable<string> {
  return RefileDAO.getAllFileHashes(namespace, itemId)
}

export async function setReference(
  namespace: string
, itemId: string
, fileHash: string
): Promise<void> {
  await RefileDAO.setReference(namespace, itemId, fileHash)
}

export async function removeReference(
  namespace: string
, itemId: string
, fileHash: string
): Promise<void> {
  await RefileDAO.removeReference(namespace, itemId, fileHash)
}

export async function removeReferencesByItem(
  namespace: string
, itemId: string
): Promise<void> {
  await RefileDAO.removeReferencesByItem(namespace, itemId)
}

export async function collectGarbage(): Promise<void> {
  const locations = await RefileDAO.removeAllUnreferencedFiles()
  await each(locations, StorageDAO.deleteFile)
}
