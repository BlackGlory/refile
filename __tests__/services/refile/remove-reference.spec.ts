import { startService, stopService, getAddress } from '@test/utils.js'
import { fetch } from 'extra-fetch'
import { del } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

test('removeReference', async () => {
  const namespace = 'namespace'
  const id = 'id'
  const hash = 'f'.repeat(64)

  const res = await fetch(del(
    url(getAddress())
  , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
  ))

  expect(res.status).toBe(204)
})
