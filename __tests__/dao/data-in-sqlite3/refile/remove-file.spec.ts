import * as DAO from '@dao/data-in-sqlite3/refile/remove-file'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { setRawFile, hasRawFile } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

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
      expect(hasRawFile(hash)).toBeFalse()
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const hash = 'hash'

      const result = DAO.removeFile(hash)

      expect(result).toBeUndefined()
      expect(hasRawFile(hash)).toBeFalse()
    })
  })
})
