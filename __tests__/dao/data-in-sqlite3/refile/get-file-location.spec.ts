import * as DAO from '@dao/data-in-sqlite3/refile/get-file-location.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getFileLocation(hash: string): string | null', () => {
  describe('exist', () => {
    it('return IFile', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })

      const result = DAO.getFileLocation(hash)

      expect(result).toBe(location)
    })
  })

  describe('not exist', () => {
    it('return IFile', () => {
      const hash = 'hash'

      const result = DAO.getFileLocation(hash)

      expect(result).toBeNull()
    })
  })
})
