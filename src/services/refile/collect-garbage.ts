import { FastifyPluginAsync } from 'fastify'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
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
      await API.collectGarbage()

      return reply
        .status(204)
        .send()
    }
  )
}
