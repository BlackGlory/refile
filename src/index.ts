import { go } from '@blackglory/go'
import * as Data from '@src/dao/database.js'
import { buildServer } from './server.js'
import { PORT, HOST, NODE_ENV, NodeEnv } from '@env/index.js'
import { youDied } from 'you-died'

// eslint-disable-next-line
go(async () => {
  Data.openDatabase()
  youDied(() => Data.closeDatabase())
  await Data.prepareDatabase()

  const server = await buildServer()
  await server.listen({ port: PORT(), host: HOST() })
  if (NODE_ENV() === NodeEnv.Test) process.exit()

  process.send?.('ready')
})
