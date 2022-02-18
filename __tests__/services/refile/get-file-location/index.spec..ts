import * as DAO from '@dao/data-in-sqlite3/refile/set-file'
import { startService, stopService, getAddress } from '@test/utils'
import { matchers } from 'jest-json-schema'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/lib/es2018/transformers'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')
expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  describe('exist', () => {
    it('200', async () => {
      const hash = 'f'.repeat(64)
      const location = 'location'
      DAO.setFile(hash, location)

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
