import { buildServer } from '@src/server'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { prepareNamespaces } from './utils'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

describe('no access control', () => {
  it('200', async () => {
    const namespaces = ['namespace']
    const server = await buildServer()
    await prepareNamespaces(namespaces)

    const res = await server.inject({
      method: 'GET'
    , url: '/refile/namespaces'
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toStrictEqual(namespaces)
  })
})
