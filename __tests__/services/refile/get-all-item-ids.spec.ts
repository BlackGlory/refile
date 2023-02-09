import { startService, stopService, getAddress } from '@test/utils.js'
import { setReference } from '@dao/database/set-reference.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'
import { toJSON } from 'extra-response'

beforeEach(startService)
afterEach(stopService)

test('getAllItemIds', async () => {
  const namespace = 'namespace'
  const itemIds = ['item-id']
  prepareItems(namespace, itemIds)

  const res = await fetch(get(
    url(getAddress())
  , pathname(`/namespaces/${namespace}/items`)
  ))

  expect(res.status).toBe(200)
  expect(await toJSON(res)).toStrictEqual(itemIds)
})

function prepareItems(namespace: string, itemIds: string[]): void {
  const fileHash = 'hash'
  for (const itemId of itemIds) {
    setReference(namespace, itemId, fileHash)
  }
}
