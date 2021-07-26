import { FastifyPluginAsync } from 'fastify'

export const routes: FastifyPluginAsync<{ Core: ICore }> =
async function routes(server, { Core }) {
  server.post(
    '/refile/gc'
  , {
      schema: {
        response: {
          204: { type: 'null' }
        }
      }
    }
  , async (req, reply) => {
      await Core.Refile.garbageCollect()

      reply.status(204).send()
    }
  )
}
