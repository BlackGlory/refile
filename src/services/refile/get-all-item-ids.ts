import { FastifyPluginAsync } from 'fastify'
import { idSchema, tokenSchema } from '@src/schema'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.get<{
    Params: { namespace: string }
    Querystring: { token?: string }
  }>(
    '/refile/namespaces/:namespace/items'
  , {
      schema: {
        params: { namespace: idSchema }
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
      const { namespace } = req.params
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

      const itemIds = Core.Refile.getAllItemIds(namespace)
      reply.status(200).send(itemIds)
    }
  )
}
