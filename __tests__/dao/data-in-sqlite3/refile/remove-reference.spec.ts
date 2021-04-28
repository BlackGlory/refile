import * as DAO from '@dao/data-in-sqlite3/refile/remove-reference'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { hasRawReference, setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

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
      expect(hasRawReference(namespace, id, fileHash)).toBeFalse()
    })
  })

  describe('not exist', () => {
    it('return undefined', () => {
      const namespace = 'namespace'
      const id = 'id'
      const fileHash = 'hash'

      const result = DAO.removeReference(namespace, id, fileHash)

      expect(result).toBeUndefined()
      expect(hasRawReference(namespace, id, fileHash)).toBeFalse()
    })
  })
})
