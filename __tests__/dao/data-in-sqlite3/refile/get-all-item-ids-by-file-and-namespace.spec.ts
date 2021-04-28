import * as DAO from '@dao/data-in-sqlite3/refile/get-all-item-ids-by-file-and-namespace'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { setRawReference } from './utils'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllItemIdsByFileAndNamespace(fileHash: string, namespace: string): string[]', () => {
  it('return string[]', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const hash = 'hash'
    const itemId1 = 'id-1'
    const itemId2 = 'id-2'
    setRawReference({
      namespace: namespace1
    , id: itemId1
    , file_hash: hash
    })
    setRawReference({
      namespace: namespace1
    , id: itemId2
    , file_hash: hash
    })
    setRawReference({
      namespace: namespace2
    , id: itemId1
    , file_hash: hash
    })

    const result = DAO.getAllItemIdsByFileAndNamespace(hash, namespace1)
    const proResult = toArray(result)

    expect(result).toBeIterable()
    expect(proResult).toEqual([itemId1, itemId2])
  })
})
