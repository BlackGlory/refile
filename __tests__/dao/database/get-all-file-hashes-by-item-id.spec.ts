import { getAllFileHashesByItemId } from '@dao/database/get-all-file-hashes-by-item-id.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

test('getAllFileHashesByItemId', () => {
  const namespace1 = 'namespace-1'
  const namespace2 = 'namespace-2'
  const id = 'id'
  setRawReference({
    namespace: namespace1
  , id
  , file_hash: 'hash1'
  })
  setRawReference({
    namespace: namespace1
  , id
  , file_hash: 'hash2'
  })
  setRawReference({
    namespace: namespace2
  , id
  , file_hash: 'hash3'
  })
  setRawReference({
    namespace: namespace2
  , id
  , file_hash: 'hash4'
  })

  const result = getAllFileHashesByItemId(namespace1, id)

  expect(result).toStrictEqual(['hash1', 'hash2'])
})
