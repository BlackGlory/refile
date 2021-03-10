import { startService, stopService, getServer } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('whitelist', () => {
  describe('enabled', () => {
    describe('id in whitelist', () => {
      it('200', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const server = getServer()
        await AccessControlDAO.addWhitelistItem(namespace)

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/namespaces/${namespace}/items`
        })

        expect(res.statusCode).toBe(200)
      })
    })

    describe('id not in whitelist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const server = getServer()

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/namespaces/${namespace}/items`
        })

        expect(res.statusCode).toBe(403)
      })
    })
  })

  describe('disabled', () => {
    describe('id not in whitelist', () => {
      it('200', async () => {
        const namespace = 'namespace'
        const server = getServer()

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/namespaces/${namespace}/items`
        })

        expect(res.statusCode).toBe(200)
      })
    })
  })
})
