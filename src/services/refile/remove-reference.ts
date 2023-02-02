import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, idSchema, hashSchema, tokenSchema } from '@src/schema.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.delete<{
    Params: {
      namespace: string
      itemId: string
      fileHash: string
    }
    Querystring: { token?: string }
  }>(
    '/refile/namespaces/:namespace/items/:itemId/files/:fileHash'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , itemId: idSchema
        , fileHash: hashSchema
        }
      , querystring: { token: tokenSchema }
      , response: {
          204: { type: 'null' }
        }
      }
    }
  , async (req, reply) => {
      const { namespace, itemId, fileHash } = req.params
      const { token } = req.query

      try {
        api.Blacklist.check(namespace)
        api.Whitelist.check(namespace)
        api.TBAC.checkDeletePermission(namespace, token)
      } catch (e) {
        if (e instanceof api.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof api.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof api.TBAC.Unauthorized) return reply.status(401).send()
        throw e
      }

      api.Refile.removeReference(namespace, itemId, fileHash)

      return reply
        .status(204)
        .send()
    }
  )
}
