import * as DAO from '@dao/data-in-sqlite3/refile/count-references'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('countReferences(fileHash: string): number', () => {
  it('return number', () => {
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

    const result = DAO.countReferences(fileHash)

    expect(result).toBe(3)
  })
})
