import { FastifyPluginAsync } from 'fastify'
import { IPFSStorageAdapter } from '@adapter/ipfs'

export const routes: FastifyPluginAsync  = async function routes(server, options) {
  const adapter: StorageAdapter = new IPFSStorageAdapter()

  server.addContentTypeParser('*', (req, payload, done) => done(null))

  server.put('/files/:hash', async (req, reply) => {
    const url = await adapter.save(req.raw)
    reply.send(url)
  })
}
