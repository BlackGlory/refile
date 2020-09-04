import { FastifyPluginAsync } from 'fastify'
import { IPFSStorageAdapter } from '@adapter/ipfs'
import multipart from 'fastify-multipart'
import * as crypto from 'crypto'
import { SplitHashValidator, NotMatchedError } from 'split-hash'

const KiB = 1024

interface MultipartFields {
  [x: string]: Multipart | Multipart[]
}

type Multipart = MultipartField | MultipartFile

interface MultipartFile {
  toBuffer: () => Promise<Buffer>
  file: NodeJS.ReadableStream
  filepath: string
  fieldname: string
  filename: string
  encoding: string
  mimetype: string
  fields: MultipartFields
}

interface MultipartField {
  fieldname: string
  value: string
  fieldnameTruncated: boolean
  valueTruncated: boolean
  fields: MultipartFields
}

export const routes: FastifyPluginAsync  = async function routes(server, options) {
  const adapter: StorageAdapter = new IPFSStorageAdapter()

  server.register(multipart, {
    limits: {
      files: 1
    }
  })

  // 只有两种在不完整传输文件的前提下中止上传的方法, 两种方法都不能返回正文:
  // 1. 断开 fastify-multipart 使用的 busboy 流, 即 req.raw.destroy()
  // 2. 手动发送响应头 Connection: close
  // 客户端可能得到 ERR_CONNECTION_RESET 或 ERR_CONNECTION_ABORTED
  server.put<{ Params: { hash: string }}>('/files/:hash', async (req, reply) => {
    const hash = req.params.hash
    const data = await req.file()

    const hashList = getHashList(data.fields)
    if (hashList.length === 0) {
      reply
        .code(400)
        .header('Connection', 'close')
        .send('The hash field is required')
      return
    }
    if (joinHash(hashList) !== hash) {
      reply
        .code(400)
        .header('Connection', 'close')
        .send('The hash list does not match the URI')
      return
    }

    let streamError: Error | undefined
    const stream = data.file
      .pipe(createHashValidator(hashList))
      .on('error', err => streamError = err)
    try {
      const url = await adapter.save(stream)
      reply.send(url)
    } catch (err) {
      // If adapter.save throws error because of the hash validator
      if (streamError && streamError instanceof NotMatchedError) {
        reply
          .code(400)
          .header('Connection', 'close')
          .send('The hash list does not match the file')
      } else {
        throw err
      }
    }
  })
}

function createHashValidator(hashList: string[]) {
  return new SplitHashValidator(hashList, 512 * KiB, createHash)
}

function getHashList(fields: MultipartFields): string[] {
  if (fields['hash']) {
    const hash = fields.hash
    if (Array.isArray(hash)) {
      if (hash.every(isMultipartField)) return hash.map(x => x.value)
    } else {
      if (isMultipartField(hash)) return [hash.value]
    }
  }
  return []
}

function isMultipartField(val: Multipart | Multipart[]): val is MultipartField {
  return 'value' in val
}

function joinHash(strArr: string[]): string {
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
