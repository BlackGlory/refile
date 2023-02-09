import { getFileLocation } from '@dao/database/get-file-location.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getFileLocation', () => {
  test('file exists', () => {
    const hash = 'hash'
    const location = 'location'
    setRawFile({ hash, location })

    const result = getFileLocation(hash)

    expect(result).toBe(location)
  })

  test('file does not exist', () => {
    const hash = 'hash'

    const result = getFileLocation(hash)

    expect(result).toBeNull()
  })
})
