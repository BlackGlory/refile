import { FastifyPluginAsync } from 'fastify'
import { hashSchema, tokenSchema } from '@src/schema.js'
import { isNull } from '@blackglory/prelude'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  server.get<{
    Params: { hash: string }
    Querystring: { token?: string }
  }>(
    '/refile/files/:hash/location'
  , {
      schema: {
        params: { hash: hashSchema }
      , querystring: { token: tokenSchema }
      , response: {
          200: { type: 'string' }
        , 404: { type: 'null' }
        }
      }
    }
  , async (req, reply) => {
      const { hash } = req.params

      const location = api.Refile.getFileLocation(hash)
      if (isNull(location)) return reply.status(404).send()

      return reply
        .status(200)
        .send(location)
    }
  )
}
