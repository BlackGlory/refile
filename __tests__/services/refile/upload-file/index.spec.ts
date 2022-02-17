import { RefileDAO } from '@dao/data-in-sqlite3/refile'
import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { put } from 'extra-request'
import { url, pathname, formDataField } from 'extra-request/lib/es2018/transformers'
import * as path from 'path'
import * as crypto from 'crypto'
import { splitHash, ProgressiveHash } from 'split-hash'
import { toArrayAsync } from 'iterable-operator'
import { fetch } from 'extra-fetch'
import { createTempDir, remove } from 'extra-filesystem'
import { createReadStream } from 'fs'
// @ts-ignore
import blobFrom from 'fetch-blob/from'

interface HashInfo {
  hash: string
  hashList: string[]
}

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

let tmpDirPath: string

beforeEach(async () => {
  tmpDirPath = await createTempDir()
  process.env.REFILE_DATA = tmpDirPath
  await startService()
})
afterEach(async () => {
  await stopService()
  await remove(tmpDirPath)
})

const KiB = 1024
const HASH_BLOCK_SIZE = 512 * KiB
const FIXTURE_FILENAME = path.join(__dirname, 'fixtures', 'file.txt')
const BAD_FIXTURE_FILENAME = path.join(__dirname, 'fixtures', 'bad.txt')

describe('file does not exist', () => {
  describe('upload success', () => {
    it('201', async () => {
      const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
      await RefileDAO.setReference('namespace', 'id', hash)

      const req = put(
        url(getAddress())
      , pathname(`/refile/files/${hash}`)
      , formDataField('hash', hashList)
      , formDataField('file', blobFrom(FIXTURE_FILENAME) as unknown as Blob)
      )

      const res = await fetch(req)
      expect(res.status).toBe(201)
    })
  })

  describe('bad hash list', () => {
    it('409', async () => {
      const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
      await RefileDAO.setReference('namespace', 'id', hash)

      const req = put(
        url(getAddress())
      , pathname(`/refile/files/${hash}`)
      , formDataField('hash', [...hashList, 'bad'])
      , formDataField('file', blobFrom(FIXTURE_FILENAME) as unknown as Blob)
      )

      const res = await fetch(req)
      expect(res.status).toBe(409)
    })
  })

  describe('bad file', () => {
    it('409', async () => {
      const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
      await RefileDAO.setReference('namespace', 'id', hash)

      const req = put(
        url(getAddress())
      , pathname(`/refile/files/${hash}`)
      , formDataField('hash', hashList)
      , formDataField('file', blobFrom(BAD_FIXTURE_FILENAME) as unknown as Blob)
      )

      const res = await fetch(req)
      expect(res.status).toBe(409)
    })
  })
})

describe('file exists', () => {
  it('204', async () => {
    const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
    await RefileDAO.setReference('namespace', 'id', hash)
    await RefileDAO.setFile(hash, 'location')

    const req = put(
      url(getAddress())
    , pathname(`/refile/files/${hash}`)
    , formDataField('hash', hashList)
    , formDataField('file', blobFrom(FIXTURE_FILENAME) as unknown as Blob)
    )

    const res = await fetch(req)
    expect(res.status).toBe(204)
  })
})

async function getHashInfo(filename: string): Promise<HashInfo> {
  const stream = createReadStream(filename)
  const hashList = await getHashList(stream)
  const hash = mergeHash(hashList)
  return { hash, hashList }
}

async function getHashList(stream: NodeJS.ReadableStream): Promise<string[]> {
  const hashList = await toArrayAsync(splitHash(stream, HASH_BLOCK_SIZE, createHash))
  return hashList
}

function createHash(): ProgressiveHash<string> {
  const hash = crypto.createHash('sha256')
  return {
    update(buffer: Buffer): void {
      hash.update(buffer)
    }
  , digest(): string {
      return hash.digest('hex')
    }
  }
}

function mergeHash(hashList: string[]): string {
  const hash = crypto.createHash('sha256')
  hash.update(hashList.join(''))
  return hash.digest('hex')
}
