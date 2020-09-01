import fastify from 'fastify'
import { routes as upload } from '@service/upload'

const IS_PRODUCTION: boolean = true || process.env.NODE_ENV === 'production'
const PORT: number = Number(process.env.PORT) || 8080
const HOST: string = process.env.HOST || (IS_PRODUCTION ? '0.0.0.0' : '127.0.0.1')

const server = fastify({ logger: true })
server.register(upload)
server.listen(PORT, HOST, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})
