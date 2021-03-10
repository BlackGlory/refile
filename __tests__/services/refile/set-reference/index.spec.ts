import { startService, stopService, getServer } from '@test/utils'
import { matchers } from 'jest-json-schema'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('204', async () => {
    const server = getServer()
    const namespace = 'namespace'
    const id = 'id'
    const hash = 'hash'.repeat(16)

    const res = await server.inject({
      method: 'PUT'
    , url: `/refile/namespaces/${namespace}/items/${id}/files/${hash}`
    })

    expect(res.statusCode).toBe(204)
  })
})
