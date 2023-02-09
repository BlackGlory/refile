import { removeFile } from '@dao/database/remove-file.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile, hasRawFile } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeFile', () => {
  test('file exists', () => {
    const hash = 'hash'
    const location = 'location'
    setRawFile({ hash, location })

    const result = removeFile(hash)

    expect(result).toBeUndefined()
    expect(hasRawFile(hash)).toBe(false)
  })

  test('file does not exist', () => {
    const hash = 'hash'

    const result = removeFile(hash)

    expect(result).toBeUndefined()
    expect(hasRawFile(hash)).toBe(false)
  })
})
