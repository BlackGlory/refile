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

describe('token-based access control', () => {
  describe('enabled', () => {
    describe('id need delete tokens', () => {
      describe('token matched', () => {
        it('200', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const token = 'token'
          const server = await buildServer()
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ id: namespace, token })

          const res = await server.inject({
            method: 'GET'
          , url: `/refile/namespaces/${namespace}/items`
          , query: { token }
          })

          expect(res.statusCode).toBe(200)
        })
      })

      describe('token does not matched', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const token = 'token'
          const server = await buildServer()
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ id: namespace, token })

          const res = await server.inject({
            method: 'GET'
          , url: `/refile/namespaces/${namespace}/items`
          })

          expect(res.statusCode).toBe(401)
        })
      })

      describe('no token', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const token = 'token'
          const server = await buildServer()
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ id: namespace, token })

          const res = await server.inject({
            method: 'GET'
          , url: `/refile/namespaces/${namespace}/items`
          })

          expect(res.statusCode).toBe(401)
        })
      })
    })

    describe('id does not need delete tokens', () => {
      describe('READ_TOKEN_REQUIRED=true', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          process.env.REFILE_READ_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const server = await buildServer()

          const res = await server.inject({
            method: 'GET'
          , url: `/refile/namespaces/${namespace}/items`
          })

          expect(res.statusCode).toBe(401)
        })
      })

      describe('READ_TOKEN_REQUIRED=false', () => {
        it('200', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const server = await buildServer()

          const res = await server.inject({
            method: 'GET'
          , url: `/refile/namespaces/${namespace}/items`
          })

          expect(res.statusCode).toBe(200)
        })
      })
    })
  })

  describe('disabled', () => {
    describe('id need delete tokens', () => {
      describe('no token', () => {
        it('200', async () => {
          const namespace = 'namespace'
          const token = 'token'
          const server = await buildServer()
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ id: namespace, token })

          const res = await server.inject({
            method: 'GET'
          , url: `/refile/namespaces/${namespace}/items`
          })

          expect(res.statusCode).toBe(200)
        })
      })
    })

    describe('id does not need delete tokens', () => {
      describe('READ_TOKEN_REQUIRED=true', () => {
        it('200', async () => {
          process.env.REFILE_READ_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const token = 'token'
          const server = await buildServer()
          await AccessControlDAO.setReadTokenRequired(namespace, true)
          await AccessControlDAO.setReadToken({ id: namespace, token })

          const res = await server.inject({
            method: 'GET'
          , url: `/refile/namespaces/${namespace}/items`
          })

          expect(res.statusCode).toBe(200)
        })
      })
    })
  })
})
