import * as DAO from '@dao/data-in-sqlite3/refile/get-all-item-ids-by-namespace.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllItemIdsByNamespace(namespace: string): Iterable<string>', () => {
  it('return Iterable<string>', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const hash = 'hash'
    const itemId1 = 'id-1'
    const itemId2 = 'id-2'
    const itemId3 = 'id-3'
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
    , id: itemId3
    , file_hash: hash
    })

    const result = DAO.getAllItemIdsByNamespace(namespace1)

    expect(result).toBeIterable()
    expect(toArray(result)).toEqual([itemId1, itemId2])
  })
})
