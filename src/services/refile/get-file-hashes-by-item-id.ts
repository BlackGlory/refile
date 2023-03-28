import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.get<{
    Params: {
      namespace: string
      itemId: string
    }
    Reply: string[]
  }>(
    '/namespaces/:namespace/items/:itemId/files'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , itemId: idSchema
        }
      , response: {
          200: {
            type: 'array'
          , items: { type: 'string' }
          }
        }
      }
    }
  , async (req, reply) => {
      const { namespace, itemId } = req.params

      const fileHashes = API.getFileHashesByItemId(namespace, itemId)

      return reply
        .status(200)
        .send(fileHashes)
    }
  )
}
