import { getAllItemIdsByFileHashAndNamespace } from '@dao/database/get-all-item-ids-by-file-hash-and-namespace.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

test('getAllItemIdsByFileHashAndNamespace', () => {
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

  const result = getAllItemIdsByFileHashAndNamespace(hash, namespace1)

  expect(result).toStrictEqual([itemId1, itemId2])
})
