import { setFile } from '@dao/database/set-file.js'
import { startService, stopService, getAddress } from '@test/utils.js'
import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname } from 'extra-request/transformers'

beforeEach(startService)
afterEach(stopService)

describe('getFileLocation', () => {
  test('file exists', async () => {
    const hash = 'f'.repeat(64)
    const location = 'location'
    setFile(hash, location)

    const res = await fetch(get(
      url(getAddress())
    , pathname(`/refile/files/${hash}/location`)
    ))

    expect(res.status).toBe(200)
    expect(await res.text()).toBe(location)
  })

  test('file does not exist', async () => {
    const hash = 'f'.repeat(64)

    const res = await fetch(get(
      url(getAddress())
    , pathname(`/refile/files/${hash}/location`)
    ))

    expect(res.status).toBe(404)
  })
})
