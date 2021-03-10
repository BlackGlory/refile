import { startService, stopService, getServer } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('blacklist', () => {
  describe('enabled', () => {
    describe('id in blacklist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        const hash = 'hash'.repeat(16)
        const server = getServer()
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/files/${hash}/namespaces/${namespace}/items`
        })

        expect(res.statusCode).toBe(403)
      })
    })

    describe('id not in blacklist', () => {
      it('200', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        const hash = 'hash'.repeat(16)
        const server = getServer()

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/files/${hash}/namespaces/${namespace}/items`
        })

        expect(res.statusCode).toBe(200)
      })
    })
  })

  describe('disabled', () => {
    describe('id in blacklist', () => {
      it('200', async () => {
        const namespace = 'namespace'
        const hash = 'hash'.repeat(16)
        const server = getServer()
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/files/${hash}/namespaces/${namespace}/items`
        })

        expect(res.statusCode).toBe(200)
      })
    })
  })
})
