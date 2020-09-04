import fastify from 'fastify'
import { routes as upload } from '@service/upload'
import { HOST, PORT } from '@src/config'

const server = fastify({ logger: true })
server.register(upload)
server.listen(PORT, HOST, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})
