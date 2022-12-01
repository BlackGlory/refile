import { startService, stopService, getAddress } from '@test/utils.js'
import { matchers } from 'jest-json-schema'
import { AccessControlDAO } from '@dao/index.js'
import { fetch } from 'extra-fetch'
import { del } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('blacklist', () => {
  describe('enabled', () => {
    describe('namespace in blacklist', () => {
      it('403', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}`)
        ))

        expect(res.status).toBe(403)
      })
    })

    describe('namespace not in blacklist', () => {
      it('204', async () => {
        process.env.REFILE_LIST_BASED_ACCESS_CONTROL = 'blacklist'
        const namespace = 'namespace'
        const id = 'id'

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}`)
        ))

        expect(res.status).toBe(204)
      })
    })
  })

  describe('disabled', () => {
    describe('namespace in blacklist', () => {
      it('204', async () => {
        const namespace = 'namespace'
        await AccessControlDAO.addBlacklistItem(namespace)

        const res = await fetch(del(
          url(getAddress())
        , pathname(`/refile/namespaces/${namespace}`)
        ))

        expect(res.status).toBe(204)
      })
    })
  })
})
