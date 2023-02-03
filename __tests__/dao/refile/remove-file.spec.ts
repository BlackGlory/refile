import { RefileDAO } from '@dao/refile/index.js'
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

      const result = RefileDAO.removeFile(hash)

      expect(result).toBeUndefined()
      expect(hasRawFile(hash)).toBe(false)
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const hash = 'hash'

      const result = RefileDAO.removeFile(hash)

      expect(result).toBeUndefined()
      expect(hasRawFile(hash)).toBe(false)
    })
  })
})
