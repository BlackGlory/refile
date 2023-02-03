import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema } from '@src/schema.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
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

      api.Refile.removeReferencesByItem(namespace, itemId)

      return reply
        .status(204)
        .send()
    }
  )
}
