import { startService, stopService, getAddress } from '@test/utils.js'
import { matchers } from 'jest-json-schema'
import { prepareNamespaces } from './utils.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'
import { toJSON } from 'extra-response'

expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('200', async () => {
    const namespaces = ['namespace']
    await prepareNamespaces(namespaces)

    const res = await fetch(get(
      url(getAddress())
    , pathname('/refile/namespaces')
    ))

    expect(res.status).toBe(200)
    expect(await toJSON(res)).toStrictEqual(namespaces)
  })
})
