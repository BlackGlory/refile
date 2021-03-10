import * as DAO from '@dao/data-in-sqlite3/refile/set-reference'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { hasRawReference, setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('setReference(namespace: string, itemId: string, fileHash: string): void', () => {
  describe('exist', () => {
    it('ignore and return undefined', () => {
      const namespace = 'namespace'
      const itemId = 'id'
      const fileHash = 'hash'
      setRawReference({
        namespace
      , item_id: itemId
      , file_hash: fileHash
      })

      const result = DAO.setReference(namespace, itemId, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, itemId, fileHash)).toBeTrue()
    })
  })

  describe('not exist', () => {
    it('insert and return undefined', () => {
      const namespace = 'namespace'
      const itemId = 'id'
      const fileHash = 'hash'

      const result = DAO.setReference(namespace, itemId, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, itemId, fileHash)).toBeTrue()
    })
  })
})
