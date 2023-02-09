import { getAllItemIdsByNamespace } from '@dao/database/get-all-item-ids-by-namespace.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'
import { toArray } from 'iterable-operator'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

test('getAllItemIdsByNamespace', () => {
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

  const iter = getAllItemIdsByNamespace(namespace1)
  const result = toArray(iter)

  expect(result).toEqual([itemId1, itemId2])
})
