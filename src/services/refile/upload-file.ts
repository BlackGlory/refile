import { FastifyPluginAsync } from 'fastify'
import { hashSchema } from '@src/schema.js'
import multipart, { Multipart, MultipartValue, MultipartFields } from '@fastify/multipart'
import { pass } from '@blackglory/prelude'
import { isArray } from '@blackglory/prelude'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.register(multipart, {
    limits: {
      files: 1
    }
  })

  server.put<{
    Params: { hash: string }
  }>(
    '/refile/files/:hash'
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
        await Core.Refile.uploadFile(hash, hashList, data.file)
        reply.status(201).send()
      } catch (err) {
        // This is a bad idea, but it works
        await consume(data.file)

        if (err instanceof Core.Refile.FileAlreadyExists) {
          return reply
            .status(204)
            .header('Connection', 'close')
            .send()
        }

        if (err instanceof Core.Refile.ReferencesIsZero) {
          return reply
            .status(400)
            .header('Connection', 'close')
            .send("The file's references is zero")
          return
        }

        if (err instanceof Core.Refile.IncorrectHashList) {
          return reply
            .status(409)
            .header('Connection', 'close')
            .send('The hash list is incorrect')
        }

        if (err instanceof Core.Refile.IncorrectFileHash) {
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

async function consume(stream: NodeJS.ReadableStream): Promise<void> {
  for await (const _ of stream) {
    pass()
  }
}

function getHashList(fields: MultipartFields): string[] {
  if (fields['hash']) {
    const hash = fields.hash
    if (isArray(hash)) {
      if (hash.every(isMultipartValue)) {
        return hash.map(x => x.value)
      }
    } else {
      if (isMultipartValue(hash)) {
        return [hash.value]
      }
    }
  }
  return []
}

function isMultipartValue(val: Multipart | Multipart[]): val is MultipartValue<string> {
  return 'value' in val
}
