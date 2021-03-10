import * as ConfigInSqlite3 from '@dao/config-in-sqlite3/database'
import * as DataInSqlite3 from '@dao/data-in-sqlite3/database'
import { resetCache } from '@env/cache'
import { buildServer } from '@src/server'

let server: ReturnType<typeof buildServer>

export function getServer() {
  return server
}

export async function startService() {
  await initializeDatabases()
  server = buildServer()
}

export async function stopService() {
  server.metrics.clearRegister()
  await server.close()
  clearDatabases()
  resetEnvironment()
}

export async function initializeDatabases() {
  ConfigInSqlite3.openDatabase()
  await ConfigInSqlite3.prepareDatabase()

  DataInSqlite3.openDatabase()
  await DataInSqlite3.prepareDatabase()
}

export async function clearDatabases() {
  ConfigInSqlite3.closeDatabase()
  DataInSqlite3.closeDatabase()
}

export async function resetEnvironment() {
  // assigning a property on `process.env` will implicitly convert the value to a string.
  // use `delete` to delete a property from `process.env`.
  // see also: https://nodejs.org/api/process.html#process_process_env
  delete process.env.REFILE_DATA
  delete process.env.REFILE_ADMIN_PASSWORD
  delete process.env.REFILE_LIST_BASED_ACCESS_CONTROL
  delete process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL
  delete process.env.REFILE_WRITE_TOKEN_REQUIRED
  delete process.env.REFILE_READ_TOKEN_REQUIRED
  delete process.env.REFILE_DELETE_TOKEN_REQUIRED
  delete process.env.REFILE_JSON_VALIDATION
  delete process.env.REFILE_DEFAULT_JSON_SCHEMA
  delete process.env.REFILE_JSON_PAYLOAD_ONLY

  // reset memoize
  resetCache()
}
