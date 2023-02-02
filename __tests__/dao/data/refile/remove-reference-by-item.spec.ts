import { RefileDAO } from '@dao/data/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'

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

      const result = RefileDAO.removeReferencesByItem(namespace1, id)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace1, id, fileHash)).toBe(false)
      expect(hasRawReference(namespace2, id, fileHash)).toBe(true)
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'

      const result = RefileDAO.removeReferencesByItem(namespace, id)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBe(false)
    })
  })
})
