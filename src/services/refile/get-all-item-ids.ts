import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.get<{
    Params: { namespace: string }
    Reply: string[]
  }>(
    '/namespaces/:namespace/items'
  , {
      schema: {
        params: { namespace: namespaceSchema }
      , response: {
          200: {
            type: 'array'
          , items: { type: 'string' }
          }
        }
      }
    }
  , async (req, reply) => {
      const { namespace } = req.params

      const itemIds = API.getAllItemIds(namespace)

      return reply
        .status(200)
        .send(itemIds)
    }
  )
}
