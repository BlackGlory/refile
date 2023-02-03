import { RefileDAO } from '@dao/refile/index.js'
import { startService, stopService, getAddress } from '@test/utils.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  describe('exist', () => {
    it('200', async () => {
      const hash = 'f'.repeat(64)
      const location = 'location'
      RefileDAO.setFile(hash, location)

      const res = await fetch(get(
        url(getAddress())
      , pathname(`/refile/files/${hash}/location`)
      ))

      expect(res.status).toBe(200)
      expect(await res.text()).toBe(location)
    })
  })

  describe('does not exist', () => {
    it('404', async () => {
      const hash = 'f'.repeat(64)

      const res = await fetch(get(
        url(getAddress())
      , pathname(`/refile/files/${hash}/location`)
      ))

      expect(res.status).toBe(404)
    })
  })
})
