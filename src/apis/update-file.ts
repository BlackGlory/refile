import * as crypto from 'crypto'
import { NotMatchedError, SplitHashValidator } from 'split-hash/nodejs'
import { go, isntNull } from '@blackglory/prelude'
import { setFile } from '@dao/database/set-file.js'
import { saveFile } from '@dao/storage/save-file.js'
import { FileAlreadyExists, IncorrectFileHash, IncorrectHashList, ReferencesIsZero } from '@src/contract.js'
import { getFileInfo } from './get-file-info.js'

const KiB = 1024
const HASH_BLOCK_SIZE = 512 * KiB

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
  const info = getFileInfo(hash)
  if (isntNull(info.location)) throw new FileAlreadyExists()
  if (info.references === 0) throw new ReferencesIsZero()
  if (mergeHash(hashList) !== hash) throw new IncorrectHashList()

  const location = await go(async () => {
    try {
      return await saveFile(
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
  setFile(hash, location)
}

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
