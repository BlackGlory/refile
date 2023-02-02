import { RefileDAO, StorageDAO } from '@dao/index.js'
import { each } from 'extra-promise'
import * as crypto from 'crypto'
import { NotMatchedError, SplitHashValidator } from 'split-hash/nodejs'
import { CustomError } from '@blackglory/errors'
import { go, isntNull } from '@blackglory/prelude'
import { IFileInfo } from './contract.js'

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
export async function uploadFile(
  hash: string
, hashList: string[]
, stream: NodeJS.ReadableStream
): Promise<void> {
  const KiB = 1024
  const HASH_BLOCK_SIZE = 512 * KiB

  const info = await getFileInfo(hash)
  if (isntNull(info.location)) throw new FileAlreadyExists()
  if (info.references === 0) throw new ReferencesIsZero()
  if (mergeHash(hashList) !== hash) throw new IncorrectHashList()

  const location = await go(async () => {
    try {
      return await StorageDAO.saveFile(
        () => stream.pipe(createHashValidator(hashList))
      )
    } catch (err) {
      if (err instanceof NotMatchedError) {
        throw new IncorrectFileHash()
      } else {
        throw err
      }
    }
  })
  RefileDAO.setFile(hash, location)

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

export function getFileInfo(hash: string): IFileInfo {
  const location = RefileDAO.getFileLocation(hash)
  const references = RefileDAO.countReferences(hash)
  return {
    hash
  , location
  , references
  }
}

export function getFileLocation(hash: string): string | null {
  return RefileDAO.getFileLocation(hash)
}

export function getAllNamespaces(): Iterable<string> {
  return RefileDAO.getAllNamespaces()
}

export function getAllItemIds(namespace: string): Iterable<string> {
  return RefileDAO.getAllItemIdsByNamespace(namespace)
}

export function getItemIdsByFile(
  namespace: string
, fileHash: string
): Iterable<string> {
  return RefileDAO.getAllItemIdsByFileAndNamespace(fileHash, namespace)
}

export function getFileHashesByItem(
  namespace: string
, itemId: string
): Iterable<string> {
  return RefileDAO.getAllFileHashes(namespace, itemId)
}

export function setReference(
  namespace: string
, itemId: string
, fileHash: string
): void {
  RefileDAO.setReference(namespace, itemId, fileHash)
}

export function removeReference(
  namespace: string
, itemId: string
, fileHash: string
): void {
  RefileDAO.removeReference(namespace, itemId, fileHash)
}

export function removeReferencesByItem(
  namespace: string
, itemId: string
): void {
  RefileDAO.removeReferencesByItem(namespace, itemId)
}

export function removeReferencesByNamespace(namespace: string): void {
  RefileDAO.removeReferencesByNamespace(namespace)
}

export async function collectGarbage(): Promise<void> {
  const locations = RefileDAO.removeAllUnreferencedFiles()
  await each(locations, StorageDAO.deleteFile)
}
