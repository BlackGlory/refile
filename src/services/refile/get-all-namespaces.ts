import { FastifyPluginAsync } from 'fastify'
import { stringifyJSONStream, stringifyNDJSONStream} from 'extra-generator'
import accepts from '@fastify/accepts'
import { Readable } from 'stream'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.register(accepts)

  server.get(
    '/refile/namespaces'
  , (req, reply) => {
      const result = api.Refile.getAllNamespaces()

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
