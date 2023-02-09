import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.delete<{
    Params: {
      namespace: string
      itemId: string
    }
  }>(
    '/refile/namespaces/:namespace/items/:itemId'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , itemId: idSchema
        }
      , response: {
          204: { type: 'null' }
        }
      }
    }
  , async (req, reply) => {
      const { namespace, itemId } = req.params

      API.removeReferencesByItemId(namespace, itemId)

      return reply
        .status(204)
        .send()
    }
  )
}
