import { go } from '@blackglory/go'
import * as ConfigInSqlite3 from '@src/dao/config/database.js'
import * as DataInSqlite3 from '@src/dao/data/database.js'
import { buildServer } from './server.js'
import { PORT, HOST, NODE_ENV, NodeEnv } from '@env/index.js'
import { youDied } from 'you-died'

go(async () => {
  ConfigInSqlite3.openDatabase()
  youDied(() => ConfigInSqlite3.closeDatabase())
  await ConfigInSqlite3.prepareDatabase()

  DataInSqlite3.openDatabase()
  youDied(() => DataInSqlite3.closeDatabase())
  await DataInSqlite3.prepareDatabase()

  const server = buildServer()
  await server.listen({ port: PORT(), host: HOST() })
  if (NODE_ENV() === NodeEnv.Test) process.exit()

  process.send?.('ready')
})
