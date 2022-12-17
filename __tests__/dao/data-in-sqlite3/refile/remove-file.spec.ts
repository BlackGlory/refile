import * as DAO from '@dao/data-in-sqlite3/refile/remove-file.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile, hasRawFile } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeFile(hash: string): void', () => {
  describe('exist', () => {
    it('return undefined', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })

      const result = DAO.removeFile(hash)

      expect(result).toBeUndefined()
      expect(hasRawFile(hash)).toBe(false)
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const hash = 'hash'

      const result = DAO.removeFile(hash)

      expect(result).toBeUndefined()
      expect(hasRawFile(hash)).toBe(false)
    })
  })
})
