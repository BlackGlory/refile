import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { tokenSchema } from '@src/schema'
import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { url, pathname, headers } from 'extra-request/lib/es2018/transformers'
import { toJSON } from 'extra-response'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('TBAC', () => {
  describe('GET /admin/refile-with-tokens', () => {
    describe('auth', () => {
      it('200', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'

        const res = await fetch(get(
          url(getAddress())
        , pathname('/admin/refile-with-tokens')
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(200)
        expect(await toJSON(res)).toMatchSchema({
          type: 'array'
        , items: { type: 'string' }
        })
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const res = await fetch(get(
          url(getAddress())
        , pathname('/admin/refile-with-tokens')
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'

        const res = await fetch(get(
          url(getAddress())
        , pathname('/admin/refile-with-tokens')
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })

  describe('GET /admin/refile/:id/tokens', () => {
    describe('auth', () => {
      it('200', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens`)
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(200)
        expect(await res.json()).toMatchSchema({
          type: 'array'
        , items: {
            type: 'object'
          , properties: {
              token: tokenSchema
            , write: { type: 'boolean' }
            , read: { type: 'boolean' }
            , delete: { type: 'boolean' }
            }
          }
        })
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const id = 'id'

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens`)
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens`)
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })

  describe('PUT /admin/refile/:id/tokens/:token/write', () => {
    describe('auth', () => {
      it('204', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/write`)
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/write`)
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/write`)
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })

  describe('DELETE /admin/refile/:id/tokens/:token/write', () => {
    describe('auth', () => {
      it('204', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/write`)
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/write`)
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/write`)
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })

  describe('PUT /admin/refile/:id/tokens/:token/read', () => {
    describe('auth', () => {
      it('204', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/read`)
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/read`)
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/read`)
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })

  describe('DELETE /admin/refile/:id/tokens/:token/read', () => {
    describe('auth', () => {
      it('204', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/read`)
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/read`)
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/read`)
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })

  describe('PUT /admin/refile/:id/tokens/:token/delete', () => {
    describe('auth', () => {
      it('204', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/delete`)
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/delete`)
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/delete`)
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })

  describe('DELETE /admin/refile/:id/tokens/:token/delete', () => {
    describe('auth', () => {
      it('204', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/delete`)
        , headers(createAuthHeaders())
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('no admin password', () => {
      it('401', async () => {
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/delete`)
        ))

        expect(res.status).toBe(401)
      })
    })

    describe('bad auth', () => {
      it('401', async () => {
        process.env.REFILE_ADMIN_PASSWORD = 'password'
        const id = 'id'
        const token = 'token'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/admin/refile/${id}/tokens/${token}/delete`)
        , headers(createAuthHeaders('bad'))
        ))

        expect(res.status).toBe(401)
      })
    })
  })
})

function createAuthHeaders(adminPassword?: string) {
  return {
    'Authorization': `Bearer ${ adminPassword ?? process.env.REFILE_ADMIN_PASSWORD }`
  }
}
