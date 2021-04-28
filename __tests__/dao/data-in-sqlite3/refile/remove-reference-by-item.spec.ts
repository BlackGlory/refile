import * as DAO from '@dao/data-in-sqlite3/refile/remove-references-by-item'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { hasRawReference, setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReferencesByItem(namespace: string, id: string): void', () => {
  describe('exist', () => {
    it('return undefined', () => {
      const namespace1 = 'namespace-1'
      const namespace2 = 'namespace-2'
      const id = 'id'
      const fileHash = 'hash'
      setRawReference({
        namespace: namespace1
      , id
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace2
      , id
      , file_hash: fileHash
      })

      const result = DAO.removeReferencesByItem(namespace1, id)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace1, id, fileHash)).toBeFalse()
      expect(hasRawReference(namespace2, id, fileHash)).toBeTrue()
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'

      const result = DAO.removeReferencesByItem(namespace, id)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBeFalse()
    })
  })
})
