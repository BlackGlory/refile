import { FastifyPluginAsync } from 'fastify'
import IPFS = require('ipfs-http-client')
import { ReadableStream } from 'web-streams-polyfill/ponyfill/es2018'

export const routes: FastifyPluginAsync  = async function routes(server, options) {
  const ipfs = IPFS('http://windows:5001')

  server.addContentTypeParser('*', (req, payload, done) => {
    done(null)
  })

  server.put('/files/:hash', async (req, reply) => {
    const stream = toReadableStream(req.raw)
    const { cid } = await ipfs.add(stream)
    console.log(cid)
    reply.send('OK')
  })
}

function toReadableStream(stream: NodeJS.ReadableStream): ReadableStream {
  return new ReadableStream({
    start(controller) {
      stream.on('data', chunk => controller.enqueue(chunk))
      stream.on('end', () => controller.close())
      stream.on('error', err => controller.error(err))
    }
  })
}
