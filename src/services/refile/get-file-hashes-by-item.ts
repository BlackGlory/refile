import { FastifyPluginAsync } from 'fastify'
import { idSchema, namespaceSchema, tokenSchema } from '@src/schema'
import { stringifyJSONStreamAsync, stringifyNDJSONStreamAsync } from 'extra-generator'
import accepts from 'fastify-accepts'
import { Readable } from 'stream'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.register(accepts)

  server.get<{
    Params: {
      namespace: string
      itemId: string
    }
    Querystring: { token?: string }
  }>(
    '/refile/namespaces/:namespace/items/:itemId/files'
  , {
      schema: {
        params: {
          namespace: namespaceSchema
        , itemId: idSchema
        }
      , querystring: { token: tokenSchema }
      }
    }
  , async (req, reply) => {
      const { namespace, itemId } = req.params
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

      const result = Core.Refile.getFileHashesByItem(namespace, itemId)

      const accept = req.accepts().type(['application/json', 'application/x-ndjson'])
      if (accept === 'application/x-ndjson') {
        reply
          .status(200)
          .header('Content-Type', 'application/x-ndjson')
          .send(Readable.from(stringifyNDJSONStreamAsync(result)))
      } else {
        reply
          .status(200)
          .header('Content-Type', 'application/json')
          .send(Readable.from(stringifyJSONStreamAsync(result)))
      }
    }
  )
}
