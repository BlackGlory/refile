import { buildServer } from '@src/server'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

describe('blacklist', () => {
  describe('enabled', () => {
    describe('id in blacklist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        const id = 'id'
        const server = await buildServer()
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/namespaces/${namespace}/items/${id}/files`
        })

        expect(res.statusCode).toBe(403)
      })
    })

    describe('id not in blacklist', () => {
      it('200', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        const id = 'id'
        const server = await buildServer()

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/namespaces/${namespace}/items/${id}/files`
        })

        expect(res.statusCode).toBe(200)
      })
    })
  })

  describe('disabled', () => {
    describe('id in blacklist', () => {
      it('200', async () => {
        const namespace = 'namespace'
        const id = 'id'
        const server = await buildServer()
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await server.inject({
          method: 'GET'
        , url: `/refile/namespaces/${namespace}/items/${id}/files`
        })

        expect(res.statusCode).toBe(200)
      })
    })
  })
})
