import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema } from '@src/schema.js'
import { stringifyJSONStream, stringifyNDJSONStream } from 'extra-generator'
import accepts from '@fastify/accepts'
import { Readable } from 'stream'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  await server.register(accepts)

  server.get<{
    Params: {
      namespace: string
      itemId: string
    }
  }>(
    '/namespaces/:namespace/items/:itemId/files'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , itemId: idSchema
        }
      }
    }
  , async (req, reply) => {
      const { namespace, itemId } = req.params

      const result = API.getFileHashesByItemId(namespace, itemId)

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
