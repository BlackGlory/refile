import * as DAO from '@dao/data-in-sqlite3/refile/remove-reference.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReference(namespace: string, id: string, fileHash: string): void', () => {
  describe('exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'
      setRawReference({
        namespace
      , id
      , file_hash: fileHash
      })

      const result = DAO.removeReference(namespace, id, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBe(false)
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'

      const result = DAO.removeReference(namespace, id, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBe(false)
    })
  })
})
