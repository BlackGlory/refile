import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao'
import { fetch } from 'extra-fetch'
import { put } from 'extra-request'
import { url, pathname } from 'extra-request/lib/es2018/transformers'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('whitelist', () => {
  describe('enabled', () => {
    describe('id in whitelist', () => {
      it('204', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const id = 'id'
        const hash = 'hash'.repeat(16)
        await AccessControlDAO.addWhitelistItem(namespace)

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('id not in whitelist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const id = 'id'
        const hash = 'hash'.repeat(16)

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
        ))

        expect(res.status).toBe(403)
      })
    })
  })

  describe('disabled', () => {
    describe('id not in whitelist', () => {
      it('204', async () => {
        const namespace = 'namespace'
        const id = 'id'
        const hash = 'hash'.repeat(16)

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
        ))

        expect(res.status).toBe(204)
      })
    })
  })
})
