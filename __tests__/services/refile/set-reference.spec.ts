import { startService, stopService, getAddress } from '@test/utils.js'
import { fetch } from 'extra-fetch'
import { put } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

test('setReference', async () => {
  const namespace = 'namespace'
  const id = 'id'
  const hash = 'f'.repeat(64)

  const res = await fetch(put(
    url(getAddress())
  , pathname(`/namespaces/${namespace}/items/${id}/files/${hash}`)
  ))

  expect(res.status).toBe(204)
})
