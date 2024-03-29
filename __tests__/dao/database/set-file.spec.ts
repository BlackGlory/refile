import { setFile } from '@dao/database/set-file.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { getRawFile, setRawFile } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('setFile', () => {
  test('file exists', () => {
    const hash = 'hash'
    setRawFile({
      hash
    , location: 'old-location'
    })

    const result = setFile(hash, 'new-location')

    expect(result).toBeUndefined()
    expect(getRawFile(hash)!.location).toBe('new-location')
  })

  test('file does not exist', () => {
    const hash = 'hash'
    const location = 'location'

    const result = setFile(hash, location)

    expect(result).toBeUndefined()
    expect(getRawFile(hash)).toEqual({ hash, location })
  })
})
