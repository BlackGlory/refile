import { startService, stopService, getAddress } from '@test/utils.js'
import { AccessControlDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { put } from 'extra-request'
import { url, pathname, searchParam } from 'extra-request/transformers'

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
          const hash = 'f'.repeat(64)
          const token = 'token'
          AccessControlDAO.TokenPolicy.setWriteTokenRequired(namespace, true)
          AccessControlDAO.Token.setWriteToken({ namespace, token })

          const res = await fetch(put(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
          , searchParam('token', token)
          ))

          expect(res.status).toBe(204)
        })
      })

      describe('token does not matched', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const hash = 'f'.repeat(64)
          const token = 'token'
          AccessControlDAO.TokenPolicy.setWriteTokenRequired(namespace, true)
          AccessControlDAO.Token.setWriteToken({ namespace, token })

          const res = await fetch(put(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
          ))

          expect(res.status).toBe(401)
        })
      })

      describe('no token', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const hash = 'f'.repeat(64)
          const token = 'token'
          AccessControlDAO.TokenPolicy.setWriteTokenRequired(namespace, true)
          AccessControlDAO.Token.setWriteToken({ namespace, token })

          const res = await fetch(put(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
          ))

          expect(res.status).toBe(401)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('WRITE_TOKEN_REQUIRED=true', () => {
        it('401', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          process.env.REFILE_WRITE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const hash = 'f'.repeat(64)

          const res = await fetch(put(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
          ))

          expect(res.status).toBe(401)
        })
      })

      describe('WRITE_TOKEN_REQUIRED=false', () => {
        it('204', async () => {
          process.env.REFILE_TOKEN_BASED_ACCESS_CONTROL = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const hash = 'f'.repeat(64)

          const res = await fetch(put(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
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
          const id = 'id'
          const hash = 'f'.repeat(64)
          const token = 'token'
          AccessControlDAO.TokenPolicy.setWriteTokenRequired(namespace, true)
          AccessControlDAO.Token.setWriteToken({ namespace, token })

          const res = await fetch(put(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
          ))

          expect(res.status).toBe(204)
        })
      })
    })

    describe('namespace does not need delete tokens', () => {
      describe('WRITE_TOKEN_REQUIRED=true', () => {
        it('204', async () => {
          process.env.REFILE_WRITE_TOKEN_REQUIRED = 'true'
          const namespace = 'namespace'
          const id = 'id'
          const hash = 'f'.repeat(64)
          const token = 'token'
          AccessControlDAO.TokenPolicy.setWriteTokenRequired(namespace, true)
          AccessControlDAO.Token.setWriteToken({ namespace, token })

          const res = await fetch(put(
            url(getAddress())
          , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
          ))

          expect(res.status).toBe(204)
        })
      })
    })
  })
})
