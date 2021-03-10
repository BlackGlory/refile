import { startService, stopService, getServer } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { prepareFiles } from './utils'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('200', async () => {
    const namespace = 'namespace'
    const itemId = 'item-id'
    const fileHashes = ['hash']
    const server = getServer()
    await prepareFiles(namespace, itemId, fileHashes)

    const res = await server.inject({
      method: 'GET'
    , url: `/refile/namespaces/${namespace}/items/${itemId}/files`
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toStrictEqual(fileHashes)
  })
})
