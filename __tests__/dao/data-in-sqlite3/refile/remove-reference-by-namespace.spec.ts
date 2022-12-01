import * as DAO from '@dao/data-in-sqlite3/refile/remove-references-by-namespace.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReferencesByNamespace(namespace: string): void', () => {
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

      const result = DAO.removeReferencesByNamespace(namespace1)

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

      const result = DAO.removeReferencesByNamespace(namespace)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBeFalse()
    })
  })
})
