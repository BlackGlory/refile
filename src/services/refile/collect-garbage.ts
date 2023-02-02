import { FastifyPluginAsync } from 'fastify'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
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
      await api.Refile.collectGarbage()

      return reply
        .status(204)
        .send()
    }
  )
}
