import { FastifyPluginAsync } from 'fastify'
import multipart from 'fastify-multipart'
import { pass } from '@blackglory/pass'
import { isArray } from '@blackglory/types'

// The d.ts of fastify-multipart is too messy, so I have to write my version.
interface MultipartFields {
  [name: string]: Multipart | Multipart[]
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
        response: {
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
          reply
            .status(204)
            .header('Connection', 'close')
            .send()
          return
        }

        if (err instanceof Core.Refile.ReferencesIsZero) {
          reply
            .status(400)
            .header('Connection', 'close')
            .send("The file's references is zero")
          return
        }

        if (err instanceof Core.Refile.IncorrectHashList) {
          reply
            .status(409)
            .header('Connection', 'close')
            .send('The hash list is incorrect')
          return
        }

        if (err instanceof Core.Refile.IncorrectFileHash) {
          reply
            .status(409)
            .header('Connection', 'close')
            .send('The file hash is incorrect')
          return
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
      if (hash.every(isMultipartField)) {
        return hash.map(x => x.value)
      }
    } else {
      if (isMultipartField(hash)) {
        return [hash.value]
      }
    }
  }
  return []
}

function isMultipartField(val: Multipart | Multipart[]): val is MultipartField {
  return 'value' in val
}
