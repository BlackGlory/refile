import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, hashSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.get<{
    Params: {
      namespace: string
      fileHash: string
    }
    Reply: string[]
  }>(
    '/files/:fileHash/namespaces/:namespace/items'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , fileHash: hashSchema
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
      const { namespace, fileHash } = req.params

      const itemIds = API.getItemIdsByFileHash(namespace, fileHash)

      return reply
        .status(200)
        .send(itemIds)
    }
  )
}
