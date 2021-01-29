import { buildServer } from '@src/server'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { matchers } from 'jest-json-schema'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

it('200', async () => {
  const server = await buildServer()
  const hash = 'hash'.repeat(16)
  const namespace = 'namespace'

  const res = await server.inject({
    method: 'GET'
  , url: `/refile/files/${hash}/namespaces/${namespace}/items`
  })

  expect(res.statusCode).toBe(200)
})
