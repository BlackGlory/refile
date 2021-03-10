import * as DAO from '@dao/data-in-sqlite3/refile/remove-references-by-item'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { hasRawReference, setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReferencesByItem(namespace: string, itemId: string): void', () => {
  describe('exist', () => {
    it('return undefined', () => {
      const namespace1 = 'namespace-1'
      const namespace2 = 'namespace-2'
      const itemId = 'id'
      const fileHash = 'hash'
      setRawReference({
        namespace: namespace1
      , item_id: itemId
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace2
      , item_id: itemId
      , file_hash: fileHash
      })

      const result = DAO.removeReferencesByItem(namespace1, itemId)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace1, itemId, fileHash)).toBeFalse()
      expect(hasRawReference(namespace2, itemId, fileHash)).toBeTrue()
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const itemId = 'id'
      const fileHash = 'hash'

      const result = DAO.removeReferencesByItem(namespace, itemId)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, itemId, fileHash)).toBeFalse()
    })
  })
})
