import { startService, stopService, getAddress } from '@test/utils.js'
import { matchers } from 'jest-json-schema'
import { prepareItems } from './utils.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'
import { toJSON } from 'extra-response'

expect.extend(matchers)

beforeEach(startService)
afterEach(stopService)

describe('no access control', () => {
  it('200', async () => {
    const hash = 'f'.repeat(64)
    const namespace = 'namespace'
    const itemIds = ['item-id']
    await prepareItems(namespace, hash, itemIds)

    const res = await fetch(get(
      url(getAddress())
    , pathname(`/refile/files/${hash}/namespaces/${namespace}/items`)
    ))

    expect(res.status).toBe(200)
    expect(await toJSON(res)).toStrictEqual(itemIds)
  })
})
