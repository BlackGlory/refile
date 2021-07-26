import * as DAO from '@dao/data-in-sqlite3/refile/remove-all-unreferenced-files'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { setRawFile, hasRawFile, setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

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
