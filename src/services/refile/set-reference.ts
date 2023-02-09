import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema, hashSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.put<{
    Params: {
      namespace: string
      itemId: string
      fileHash: string
    }
  }>(
    '/refile/namespaces/:namespace/items/:itemId/files/:fileHash'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , itemId: idSchema
        , fileHash: hashSchema
        }
      , response: {
          204: { type: 'null' }
        }
      }
    }
  , async (req, reply) => {
      const { namespace, itemId, fileHash } = req.params

      API.setReference(namespace, itemId, fileHash)

      return reply
        .status(204)
        .send()
    }
  )
}
