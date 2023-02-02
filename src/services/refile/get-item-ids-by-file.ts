import { FastifyPluginAsync } from 'fastify'
import { namespaceSchema, hashSchema, tokenSchema } from '@src/schema.js'
import { stringifyJSONStream, stringifyNDJSONStream } from 'extra-generator'
import accepts from '@fastify/accepts'
import { Readable } from 'stream'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.register(accepts)

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
          namespace: namespaceSchema
        , fileHash: hashSchema
        }
      , querystring: { token: tokenSchema }
      }
    }
  , async (req, reply) => {
      const { namespace, fileHash } = req.params
      const { token } = req.query

      try {
        await api.Blacklist.check(namespace)
        await api.Whitelist.check(namespace)
        await api.TBAC.checkReadPermission(namespace, token)
      } catch (e) {
        if (e instanceof api.Blacklist.Forbidden) return reply.status(403).send()
        if (e instanceof api.Whitelist.Forbidden) return reply.status(403).send()
        if (e instanceof api.TBAC.Unauthorized) return reply.status(401).send()
        throw e
      }

      const result = api.Refile.getItemIdsByFile(namespace, fileHash)

      const accept = req.accepts().type(['application/json', 'application/x-ndjson'])
      if (accept === 'application/x-ndjson') {
        return reply
          .status(200)
          .header('Content-Type', 'application/x-ndjson')
          .send(Readable.from(stringifyNDJSONStream(result)))
      } else {
        return reply
          .status(200)
          .header('Content-Type', 'application/json')
          .send(Readable.from(stringifyJSONStream(result)))
      }
    }
  )
}
