import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema, hashSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.delete<{
    Params: {
      namespace: string
      itemId: string
      fileHash: string
    }
  }>(
    '/namespaces/:namespace/items/:itemId/files/:fileHash'
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

      API.removeReference(namespace, itemId, fileHash)

      return reply
        .status(204)
        .send()
    }
  )
}
