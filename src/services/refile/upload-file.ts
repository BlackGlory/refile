import { FastifyPluginAsync } from 'fastify'
import { hashSchema } from '@src/schema.js'
import multipart, { Multipart, MultipartValue, MultipartFields } from '@fastify/multipart'
import { isArray, isString } from '@blackglory/prelude'
import { IAPI, FileAlreadyExists, IncorrectFileHash, IncorrectHashList, NoReferences } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  await server.register(multipart, {
    limits: {
      files: 1
    }
  })

  server.put<{
    Params: { hash: string }
  }>(
    '/files/:hash'
  , {
      schema: {
        params: {
          hash: hashSchema
        }
      , response: {
          201: { type: 'null' }
        , 204: { type: 'null' }
        }
      }
    }
  , async (req, reply) => {
      const hash = req.params.hash
      const data = await req.file()
      if (!data) return reply.status(400).send('The file is required')
      const hashList = getHashList(data.fields)

      try {
        await API.uploadFile(hash, hashList, data.file)
        return reply
          .status(201)
          .send()
      } catch (err) {
        if (err instanceof FileAlreadyExists) {
          return reply
            .status(204)
            .header('Connection', 'close')
            .send()
        }

        if (err instanceof NoReferences) {
          return reply
            .status(400)
            .header('Connection', 'close')
            .send('The file is not referenced')
        }

        if (err instanceof IncorrectHashList) {
          return reply
            .status(409)
            .header('Connection', 'close')
            .send('The hash list is incorrect')
        }

        if (err instanceof IncorrectFileHash) {
          return reply
            .status(409)
            .header('Connection', 'close')
            .send('The file hash is incorrect')
        }

        throw err
      }
    }
  )
}

function getHashList(fields: MultipartFields): string[] {
  if (fields['hash']) {
    const hashField = fields.hash
    if (isArray(hashField)) {
      if (hashField.every(isMultipartValue)) {
        const values = hashField.map(x => x.value)
        // 不确定验证为字符串是否必要, 因为multipart只能原生封装字符串和二进制.
        // 此处的验证只是考虑到MultipartValue支持泛型且默认为unknown.
        if (values.every(isString)) return values
      }
    } else {
      if (isMultipartValue(hashField)) {
        const value = hashField.value
        // 不确定验证为字符串是否必要, 因为multipart只能原生封装字符串和二进制.
        // 此处的验证只是考虑到MultipartValue支持泛型且默认为unknown.
        if (isString(value)) return [value]
      }
    }
  }
  return []
}

function isMultipartValue(val: Multipart | Multipart[]): val is MultipartValue {
  return 'value' in val
}
