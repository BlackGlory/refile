import { startService, stopService, getAddress } from '@test/utils.js'
import { fetch } from 'extra-fetch'
import { del } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

test('removeReferenceByItemId', async () => {
  const namespace = 'namespace'
  const id = 'id'

  const res = await fetch(del(
    url(getAddress())
  , pathname(`/refile/namespaces/${namespace}/items/${id}`)
  ))

  expect(res.status).toBe(204)
})
