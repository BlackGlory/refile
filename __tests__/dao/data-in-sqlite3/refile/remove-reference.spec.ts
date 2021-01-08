import * as DAO from '@dao/data-in-sqlite3/refile/remove-reference'
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

describe('removeReference(namespace: string, itemId: string, fileHash: string): void', () => {
  describe('exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const itemId = 'id'
      const fileHash = 'hash'
      setRawReference({
        namespace
      , item_id: itemId
      , file_hash: fileHash
      })

      const result = DAO.removeReference(namespace, itemId, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, itemId, fileHash)).toBeFalse()
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const itemId = 'id'
      const fileHash = 'hash'

      const result = DAO.removeReference(namespace, itemId, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, itemId, fileHash)).toBeFalse()
    })
  })
})
