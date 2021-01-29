import { FastifyPluginAsync } from 'fastify'
import { Readable } from 'stream'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.get(
    '/refile/namespaces'
  , {
      schema: {
        response: {
          200: {
            type: 'array'
          , items: { type: 'string' }
          }
        }
      }
    }
  , async (req, reply) => {
      const namespaces = Core.Refile.getAllNamespaces()
      reply.status(200).send(Readable.from(namespaces))
    }
  )
}
