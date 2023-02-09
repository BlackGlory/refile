import { startService, stopService, getAddress } from '@test/utils.js'
import { setReference } from '@dao/database/set-reference.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'
import { toJSON } from 'extra-response'

beforeEach(startService)
afterEach(stopService)

test('getAllNamespaces', async () => {
  const namespaces = ['namespace']
  prepareNamespaces(namespaces)

  const res = await fetch(get(
    url(getAddress())
  , pathname('/refile/namespaces')
  ))

  expect(res.status).toBe(200)
  expect(await toJSON(res)).toStrictEqual(namespaces)
})

export function prepareNamespaces(namespaces: string[]): void {
  const itemId = 'item-id'
  const fileHash = 'hash'
  for (const namespace of namespaces) {
    setReference(namespace, itemId, fileHash)
  }
}
