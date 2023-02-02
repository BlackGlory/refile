import { RefileDAO } from '@dao/data/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('setReference(namespace: string, id: string, fileHash: string): void', () => {
  describe('exist', () => {
    it('ignore and return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'
      setRawReference({
        namespace
      , id
      , file_hash: fileHash
      })

      const result = RefileDAO.setReference(namespace, id, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBe(true)
    })
  })

  describe('not exist', () => {
    it('insert and return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'

      const result = RefileDAO.setReference(namespace, id, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBe(true)
    })
  })
})
