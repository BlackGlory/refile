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

describe('no access control', () => {
  it('200', async () => {
    const server = await buildServer()
    const hash = 'hash'.repeat(16)

    const res = await server.inject({
      method: 'GET'
    , url: `/refile/files/${hash}`
    })

    expect(res.statusCode).toBe(200)
  })
})
