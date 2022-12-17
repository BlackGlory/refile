import * as DAO from '@dao/data-in-sqlite3/refile/remove-references-by-file.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReferencesByFile(fileHash: string): void', () => {
  describe('exist', () => {
    it('return undefined', () => {
      const namespace1 = 'namespace-1'
      const namespace2 = 'namespace-2'
      const itemId1 = 'id-1'
      const itemId2 = 'id-2'
      const fileHash = 'hash'
      setRawReference({
        namespace: namespace1
      , id: itemId1
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace1
      , id: itemId2
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace2
      , id: itemId1
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace2
      , id: itemId2
      , file_hash: fileHash
      })

      const result = DAO.removeReferencesByFile(fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace1, itemId1, fileHash)).toBe(false)
      expect(hasRawReference(namespace1, itemId2, fileHash)).toBe(false)
      expect(hasRawReference(namespace2, itemId1, fileHash)).toBe(false)
      expect(hasRawReference(namespace2, itemId2, fileHash)).toBe(false)
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'

      const result = DAO.removeReferencesByFile(fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBe(false)
    })
  })
})
