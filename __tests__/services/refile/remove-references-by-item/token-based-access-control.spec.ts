import { startService, stopService, getServer } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('token-based access control', () => {
  describe('enabled', () => {
    describe('id need delete tokens', () => {
      describe('token matched', () => {
        it('204', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const server = getServer()
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ id: namespace, token })

          const res = await server.inject({
            method: 'DELETE'
          , url: `/refile/namespaces/${namespace}/items/${id}`
          , query: { token }
          })

          expect(res.statusCode).toBe(204)
        })
      })

      describe('token does not matched', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const server = getServer()
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ id: namespace, token })

          const res = await server.inject({
            method: 'DELETE'
          , url: `/refile/namespaces/${namespace}/items/${id}`
          })

          expect(res.statusCode).toBe(401)
        })
      })

      describe('no token', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const server = getServer()
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ id: namespace, token })

          const res = await server.inject({
            method: 'DELETE'
          , url: `/refile/namespaces/${namespace}/items/${id}`
          })

          expect(res.statusCode).toBe(401)
        })
      })
    })

    describe('id does not need delete tokens', () => {
      describe('DELETE_TOKEN_REQUIRED=true', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          process.env.REFILE_DELETE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const server = getServer()

          const res = await server.inject({
            method: 'DELETE'
          , url: `/refile/namespaces/${namespace}/items/${id}`
          })

          expect(res.statusCode).toBe(401)
        })
      })

      describe('DELETE_TOKEN_REQUIRED=false', () => {
        it('204', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const server = getServer()

          const res = await server.inject({
            method: 'DELETE'
          , url: `/refile/namespaces/${namespace}/items/${id}`
          })

          expect(res.statusCode).toBe(204)
        })
      })
    })
  })

  describe('disabled', () => {
    describe('id need delete tokens', () => {
      describe('no token', () => {
        it('204', async () => {
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const server = getServer()
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ id: namespace, token })

          const res = await server.inject({
            method: 'DELETE'
          , url: `/refile/namespaces/${namespace}/items/${id}`
          })

          expect(res.statusCode).toBe(204)
        })
      })
    })

    describe('id does not need delete tokens', () => {
      describe('DELETE_TOKEN_REQUIRED=true', () => {
        it('204', async () => {
          process.env.REFILE_DELETE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const token = 'token'
          const server = getServer()
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ id: namespace, token })

          const res = await server.inject({
            method: 'DELETE'
          , url: `/refile/namespaces/${namespace}/items/${id}`
          })

          expect(res.statusCode).toBe(204)
        })
      })
    })
  })
})
