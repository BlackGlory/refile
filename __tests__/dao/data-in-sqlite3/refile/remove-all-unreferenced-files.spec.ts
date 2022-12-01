import * as DAO from '@dao/data-in-sqlite3/refile/remove-all-unreferenced-files.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile, hasRawFile, setRawReference } from './utils.js'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeAllUnreferencedFiles(): string[]', () => {
  describe('unreferenced file', () => {
    it('remove file and return location', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })

      const result = DAO.removeAllUnreferencedFiles()

      expect(result).toEqual([location])
      expect(hasRawFile(hash)).toBeFalse()
    })
  })

  describe('refferenced file', () => {
    it('do nothing', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })
      setRawReference({
        id: 'id'
      , namespace: 'namespace'
      , file_hash: hash
      })

      const result = DAO.removeAllUnreferencedFiles()

      expect(result).toEqual([])
      expect(hasRawFile(hash)).toBeTrue()
    })
  })
})
