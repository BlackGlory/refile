import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/lib/es2018/transformers'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('blacklist', () => {
  describe('enabled', () => {
    describe('namespace in blacklist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        const id = 'id'
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files`)
        ))

        expect(res.status).toBe(403)
      })
    })

    describe('namespace not in blacklist', () => {
      it('200', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        const id = 'id'

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files`)
        ))

        expect(res.status).toBe(200)
      })
    })
  })

  describe('disabled', () => {
    describe('namespace in blacklist', () => {
      it('200', async () => {
        const namespace = 'namespace'
        const id = 'id'
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files`)
        ))

        expect(res.status).toBe(200)
      })
    })
  })
})
