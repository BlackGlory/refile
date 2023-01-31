import { FastifyPluginAsync } from 'fastify'
import { hashSchema, tokenSchema } from '@src/schema.js'
import { isNull } from '@blackglory/prelude'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
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

      const location = await Core.Refile.getFileLocation(hash)
      if (isNull(location)) return reply.status(404).send()

      return reply
        .status(200)
        .send(location)
    }
  )
}
