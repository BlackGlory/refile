import { FastifyPluginAsync } from 'fastify'
import { hashSchema } from '@src/schema.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  server.get<{
    Params: { hash: string }
  }>(
    '/refile/files/:hash'
  , {
      schema: {
        params: { hash: hashSchema }
      , response: {
          200: {
            hash: { type: 'string' }
          , location: { type: 'string', nullable: true }
          , references: { type: 'number' }
          }
        }
      }
    }
  , async (req, reply) => {
      const { hash } = req.params

      const info = API.getFileInfo(hash)

      return reply
        .status(200)
        .send(info)
    }
  )
}
