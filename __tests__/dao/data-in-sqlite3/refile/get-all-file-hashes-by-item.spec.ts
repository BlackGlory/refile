import * as DAO from '@dao/data-in-sqlite3/refile/get-all-file-hashes-by-item'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { setRawReference } from './utils'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllFileHashesByItem(namespace: string, itemId: string): string[]', () => {
  it('return string[]', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const itemId = 'id'
    setRawReference({
      namespace: namespace1
    , item_id: itemId
    , file_hash: 'hash1'
    })
    setRawReference({
      namespace: namespace1
    , item_id: itemId
    , file_hash: 'hash2'
    })
    setRawReference({
      namespace: namespace2
    , item_id: itemId
    , file_hash: 'hash3'
    })
    setRawReference({
      namespace: namespace2
    , item_id: itemId
    , file_hash: 'hash4'
    })

    const result = DAO.getAllFileHashes(namespace1, itemId)
    const proResult = toArray(result)

    expect(result).toBeIterable()
    expect(proResult).toEqual(['hash1', 'hash2'])
  })
})
