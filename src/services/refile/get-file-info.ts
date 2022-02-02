import { FastifyPluginAsync } from 'fastify'
import { hashSchema, tokenSchema } from '@src/schema'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.get<{
    Params: { hash: string }
    Querystring: { token?: string }
  }>(
    '/refile/files/:hash'
  , {
      schema: {
        params: { hash: hashSchema }
      , querystring: { token: tokenSchema }
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

      const info = await Core.Refile.getFileInfo(hash)
      reply.status(200).send(info)
    }
  )
}
