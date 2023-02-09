import { closeDatabase, openDatabase, prepareDatabase } from '@src/database.js'
import { resetCache } from '@env/cache.js'
import { buildServer } from '@src/server.js'
import { UnpackedPromise } from 'hotypes'

let server: UnpackedPromise<ReturnType<typeof buildServer>>
let address: string

export function getAddress() {
  return address
}

export async function startService() {
  await initializeDatabases()
  server = await buildServer()
  address = await server.listen()
}

export async function stopService() {
  await server.close()
  clearDatabases()
  resetEnvironment()
}

export async function initializeDatabases() {
  openDatabase()
  await prepareDatabase()
}

export function clearDatabases() {
  closeDatabase()
}

export function resetEnvironment() {
  // assigning a property on `process.env` will implicitly convert the value to a string.
  // use `delete` to delete a property from `process.env`.
  // see also: https://nodejs.org/api/process.html#process_process_env
  delete process.env.REFILE_DATA

  // reset memoize
  resetCache()
}
