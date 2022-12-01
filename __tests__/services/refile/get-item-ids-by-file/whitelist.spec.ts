import { startService, stopService, getAddress } from '@test/utils.js'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('whitelist', () => {
  describe('enabled', () => {
    describe('namespace in whitelist', () => {
      it('200', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const hash = 'f'.repeat(64)
        await AccessControlDAO.addWhitelistItem(namespace)

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/refile/files/${hash}/namespaces/${namespace}/items`)
        ))

        expect(res.status).toBe(200)
      })
    })

    describe('namespace not in whitelist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'whitelist'
        const namespace = 'namespace'
        const hash = 'f'.repeat(64)

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/refile/files/${hash}/namespaces/${namespace}/items`)
        ))

        expect(res.status).toBe(403)
      })
    })
  })

  describe('disabled', () => {
    describe('namespace not in whitelist', () => {
      it('200', async () => {
        const namespace = 'namespace'
        const hash = 'f'.repeat(64)

        const res = await fetch(get(
          url(getAddress())
        , pathname(`/refile/files/${hash}/namespaces/${namespace}/items`)
        ))

        expect(res.status).toBe(200)
      })
    })
  })
})
