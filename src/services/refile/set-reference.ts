import { FastifyPluginAsync } from 'fastify'
import { idSchema, hashSchema, tokenSchema } from '@src/schema'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.put<{
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
          namespace: idSchema
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
        await Core.Blacklist.check(namespace)
        await Core.Whitelist.check(namespace)
        await Core.TBAC.checkWritePermission(namespace, token)
      } catch (e) {
        if (e instanceof Core.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.TBAC.Unauthorized) return reply.status(401).send()
        throw e
      }

      await Core.Refile.setReference(namespace, itemId, fileHash)
      reply.status(204).send()
    }
  )
}
