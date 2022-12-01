import { startService, stopService, getAddress } from '@test/utils.js'
import { matchers } from 'jest-json-schema'
import { fetch } from 'extra-fetch'
import { del } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('204', async () => {
    const namespace = 'namespace'

    const res = await fetch(del(
      url(getAddress())
    , pathname(`/refile/namespaces/${namespace}`)
    ))

    expect(res.status).toBe(204)
  })
})
