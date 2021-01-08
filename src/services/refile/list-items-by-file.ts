import { FastifyPluginAsync } from 'fastify'
import { idSchema, hashSchema, tokenSchema } from '@src/schema'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.get<{
    Params: {
      namespace: string
      fileHash: string
    }
    Querystring: { token?: string }
  }>(
    '/refile/files/:fileHash/namespaces/:namespace/items'
  , {
      schema: {
        params: {
          namespace: idSchema
        , fileHash: hashSchema
        }
      , querystring: { token: tokenSchema }
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
      const { token } = req.query

      try {
        await Core.Blacklist.check(namespace)
        await Core.Whitelist.check(namespace)
        await Core.TBAC.checkReadPermission(namespace, token)
      } catch (e) {
        if (e instanceof Core.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof Core.TBAC.Unauthorized) return reply.status(401).send()
        throw e
      }

      const itemIds = await Core.Refile.listItemsByFile(namespace, fileHash)
      reply.status(200).send(itemIds)
    }
  )
}
