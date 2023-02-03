import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, hashSchema } from '@src/schema.js'
import { stringifyJSONStream, stringifyNDJSONStream } from 'extra-generator'
import accepts from '@fastify/accepts'
import { Readable } from 'stream'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  await server.register(accepts)

  server.get<{
    Params: {
      namespace: string
      fileHash: string
    }
  }>(
    '/refile/files/:fileHash/namespaces/:namespace/items'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , fileHash: hashSchema
        }
      }
    }
  , async (req, reply) => {
      const { namespace, fileHash } = req.params

      const result = api.Refile.getItemIdsByFile(namespace, fileHash)

      // eslint-disable-next-line
      const accept = req
        .accepts()
        .type(['application/json', 'application/x-ndjson']) as string
      if (accept === 'application/x-ndjson') {
        return reply
          .status(200)
          .header('Content-Type', 'application/x-ndjson')
          .send(Readable.from(stringifyNDJSONStream(result)))
      } else {
        return reply
          .status(200)
          .header('Content-Type', 'application/json')
          .send(Readable.from(stringifyJSONStream(result)))
      }
    }
  )
}
