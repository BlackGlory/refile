import { startService, stopService, getAddress } from '@test/utils.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'
import { toJSON } from 'extra-response'

beforeEach(startService)
afterEach(stopService)

test('getFileInfo', async () => {
  const hash = 'f'.repeat(64)

  const res = await fetch(get(
    url(getAddress())
  , pathname(`/files/${hash}`)
  ))

  expect(res.status).toBe(200)
  expect(await toJSON(res)).toStrictEqual({
    hash
  , location: null
  , references: 0
  })
})
