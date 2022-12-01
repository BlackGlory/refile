import { startService, stopService, getAddress } from '@test/utils.js'
import { matchers } from 'jest-json-schema'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('200', async () => {
    const hash = 'f'.repeat(64)

    const res = await fetch(get(
      url(getAddress())
    , pathname(`/refile/files/${hash}`)
    ))

    expect(res.status).toBe(200)
  })
})
