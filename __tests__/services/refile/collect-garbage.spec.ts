import { startService, stopService, getAddress } from '@test/utils.js'
import { fetch } from 'extra-fetch'
import { post } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

test('collectGarbage', async () => {
  const res = await fetch(post(
    url(getAddress())
  , pathname('/collect-garbage')
  ))

  expect(res.status).toBe(204)
})
