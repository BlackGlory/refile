import { startService, stopService, getAddress } from '@test/utils.js'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { del } from 'extra-request'
import { url, pathname, searchParam } from 'extra-request/transformers'

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
          const token = 'token'
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ namespace, token })

          const res = await fetch(del(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}`)
          , searchParam('token', token)
          ))

          expect(res.status).toBe(204)
        })
      })

      describe('token does not matched', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const token = 'token'
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ namespace, token })

          const res = await fetch(del(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}`)
          ))

          expect(res.status).toBe(401)
        })
      })

      describe('no token', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const token = 'token'
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ namespace, token })

          const res = await fetch(del(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}`)
          ))

          expect(res.status).toBe(401)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('DELETE_TOKEN_REQUIRED=true', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          process.env.REFILE_DELETE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'

          const res = await fetch(del(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}`)
          ))

          expect(res.status).toBe(401)
        })
      })

      describe('DELETE_TOKEN_REQUIRED=false', () => {
        it('204', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'

          const res = await fetch(del(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}`)
          ))

          expect(res.status).toBe(204)
        })
      })
    })
  })

  describe('disabled', () => {
    describe('id need delete tokens', () => {
      describe('no token', () => {
        it('204', async () => {
          const namespace = 'namespace'
          const token = 'token'
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ namespace, token })

          const res = await fetch(del(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}`)
          ))

          expect(res.status).toBe(204)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('DELETE_TOKEN_REQUIRED=true', () => {
        it('204', async () => {
          process.env.REFILE_DELETE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const token = 'token'
          await AccessControlDAO.setDeleteTokenRequired(namespace, true)
          await AccessControlDAO.setDeleteToken({ namespace, token })

          const res = await fetch(del(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}`)
          ))

          expect(res.status).toBe(204)
        })
      })
    })
  })
})
