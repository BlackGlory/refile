import { RefileDAO } from '@dao/refile/index.js'
import { startService, stopService, getAddress } from '@test/utils.js'
import { put } from 'extra-request'
import { url, pathname, formDataField } from 'extra-request/transformers'
import * as path from 'path'
import * as crypto from 'crypto'
import { splitHash, IProgressiveHash } from 'split-hash/nodejs'
import { toArrayAsync } from 'iterable-operator'
import { fetch } from 'extra-fetch'
import { createTempDir, remove } from 'extra-filesystem'
import { createReadStream } from 'fs'
import { readFile } from 'fs/promises'
import { Blob } from 'extra-fetch'
import { fileURLToPath } from 'url'

interface HashInfo {
  hash: string
  hashList: string[]
}

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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const KiB = 1024
const HASH_BLOCK_SIZE = 512 * KiB
const FIXTURE_FILENAME = path.join(__dirname, 'fixtures', 'file.txt')
const BAD_FIXTURE_FILENAME = path.join(__dirname, 'fixtures', 'bad.txt')

describe('file does not exist', () => {
  describe('upload success', () => {
    it('201', async () => {
      const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
      RefileDAO.setReference('namespace', 'id', hash)

      const req = put(
        url(getAddress())
      , pathname(`/refile/files/${hash}`)
      , formDataField('hash', hashList)
      , formDataField('file', await getFile(FIXTURE_FILENAME))
      )

      const res = await fetch(req)
      expect(res.status).toBe(201)
    })
  })

  describe('bad hash list', () => {
    it('409', async () => {
      const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
      RefileDAO.setReference('namespace', 'id', hash)

      const req = put(
        url(getAddress())
      , pathname(`/refile/files/${hash}`)
      , formDataField('hash', [...hashList, 'bad'])
      , formDataField('file', await getFile(FIXTURE_FILENAME))
      )

      const res = await fetch(req)
      expect(res.status).toBe(409)
    })
  })

  describe('bad file', () => {
    it('409', async () => {
      const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
      RefileDAO.setReference('namespace', 'id', hash)

      const req = put(
        url(getAddress())
      , pathname(`/refile/files/${hash}`)
      , formDataField('hash', hashList)
      , formDataField('file', await getFile(BAD_FIXTURE_FILENAME))
      )

      const res = await fetch(req)
      expect(res.status).toBe(409)
    })
  })
})

describe('file exists', () => {
  it('204', async () => {
    const { hash, hashList } = await getHashInfo(FIXTURE_FILENAME)
    RefileDAO.setReference('namespace', 'id', hash)
    RefileDAO.setFile(hash, 'location')

    const req = put(
      url(getAddress())
    , pathname(`/refile/files/${hash}`)
    , formDataField('hash', hashList)
    , formDataField('file', await getFile(FIXTURE_FILENAME))
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

function createHash(): IProgressiveHash<string> {
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

async function getFile(filename: string): Promise<Blob> {
  const buffer = await readFile(filename)
  return new Blob([buffer])
}
