import * as DAO from '@dao/data-in-sqlite3/refile/remove-references-by-file'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { hasRawReference, setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

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
      , item_id: itemId1
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace1
      , item_id: itemId2
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace2
      , item_id: itemId1
      , file_hash: fileHash
      })
      setRawReference({
        namespace: namespace2
      , item_id: itemId2
      , file_hash: fileHash
      })

      const result = DAO.removeReferencesByFile(fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace1, itemId1, fileHash)).toBeFalse()
      expect(hasRawReference(namespace1, itemId2, fileHash)).toBeFalse()
      expect(hasRawReference(namespace2, itemId1, fileHash)).toBeFalse()
      expect(hasRawReference(namespace2, itemId2, fileHash)).toBeFalse()
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const itemId = 'id'
      const fileHash = 'hash'

      const result = DAO.removeReferencesByFile(fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, itemId, fileHash)).toBeFalse()
    })
  })
})
