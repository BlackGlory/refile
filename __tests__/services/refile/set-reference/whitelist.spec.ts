import { startService, stopService, getAddress } from '@test/utils.js'
import { AccessControlDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { put } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

describe('whitelist', () => {
  describe('enabled', () => {
    describe('namespace in whitelist', () => {
      it('204', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const id = 'id'
        const hash = 'f'.repeat(64)
        await AccessControlDAO.addWhitelistItem(namespace)

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
        ))

        expect(res.status).toBe(204)
      })
    })

    describe('namespace not in whitelist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const id = 'id'
        const hash = 'f'.repeat(64)

        const res = await fetch(put(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
        ))

        expect(res.status).toBe(403)
      })
    })
  })

  describe('disabled', () => {
    describe('namespace not in whitelist', () => {
      it('204', async () => {
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
