import { FastifyPluginAsync } from 'fastify'
import multipart from 'fastify-multipart'
import IPFS = require('ipfs-http-client')
import { ReadableStream } from 'web-streams-polyfill/ponyfill/es2018'

export const routes: FastifyPluginAsync  = async function routes(server, options) {
  const ipfs = IPFS('http://windows:5001')

  server.register(multipart)

  server.put('/files/:hash', async (req, reply) => {
    const data = await req.file()
    const stream = toReadableStream(data.file)
    const { cid } = await ipfs.add(stream)
    reply.send(cid.multihash)
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
