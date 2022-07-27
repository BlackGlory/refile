import { go } from '@blackglory/go'
import * as ConfigInSqlite3 from '@src/dao/config-in-sqlite3/database'
import * as DataInSqlite3 from '@src/dao/data-in-sqlite3/database'
import { buildServer } from './server'
import { PORT, HOST, NODE_ENV, NodeEnv } from '@env'

process.on('exit', () => {
  DataInSqlite3.closeDatabase()
  ConfigInSqlite3.closeDatabase()
})

process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))

go(async () => {
  ConfigInSqlite3.openDatabase()
  await ConfigInSqlite3.prepareDatabase()

  DataInSqlite3.openDatabase()
  await DataInSqlite3.prepareDatabase()

  const server = buildServer()
  await server.listen(PORT(), HOST())
  if (NODE_ENV() === NodeEnv.Test) process.exit()

  process.send?.('ready')
})
