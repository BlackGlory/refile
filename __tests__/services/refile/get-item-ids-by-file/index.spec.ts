import { buildServer } from '@src/server'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { prepareItems } from './utils'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

describe('no access control', () => {
  it('200', async () => {
    const hash = 'hash'.repeat(16)
    const namespace = 'namespace'
    const itemIds = ['item-id']
    const server = await buildServer()
    await prepareItems(namespace, hash, itemIds)

    const res = await server.inject({
      method: 'GET'
    , url: `/refile/files/${hash}/namespaces/${namespace}/items`
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toStrictEqual(itemIds)
  })
})
