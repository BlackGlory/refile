import { startService, stopService, getAddress } from '@test/utils.js'
import { setReference } from '@dao/database/set-reference.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'
import { toJSON } from 'extra-response'

beforeEach(startService)
afterEach(stopService)

test('getFileHashesByItemId', async () => {
  const namespace = 'namespace'
  const itemId = 'item-id'
  const fileHashes = ['hash']
  prepareFiles(namespace, itemId, fileHashes)

  const res = await fetch(get(
    url(getAddress())
  , pathname(`/refile/namespaces/${namespace}/items/${itemId}/files`)
  ))

  expect(res.status).toBe(200)
  expect(await toJSON(res)).toStrictEqual(fileHashes)
})

export function prepareFiles(
  namespace: string
, itemId: string
, fileHashes: string[]
): void {
  for (const fileHash of fileHashes) {
    setReference(namespace, itemId, fileHash)
  }
}
