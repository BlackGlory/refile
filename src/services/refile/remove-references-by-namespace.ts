import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.delete<{
    Params: {
      namespace: string
      itemId: string
    }
  }>(
    '/namespaces/:namespace'
  , {
      schema: {
        params: { namespace: namespaceSchema }
      , response: {
          204: { type: 'null' }
        }
      }
    }
  , async (req, reply) => {
      const { namespace } = req.params

      API.removeReferencesByNamespace(namespace)

      return reply
        .status(204)
        .send()
    }
  )
}
