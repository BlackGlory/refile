import { getAllNamespaces } from '@dao/database/get-all-namespaces.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

test('getAllNamespaces', () => {
  const namespace1 = 'namespace-1'
  const namespace2 = 'namespace-2'
  const id = 'id'
  const hash = 'hash'
  setRawReference({
    namespace: namespace1
  , id
  , file_hash: hash
  })
  setRawReference({
    namespace: namespace2
  , id
  , file_hash: hash
  })

  const result = getAllNamespaces()

  expect(result).toStrictEqual([namespace1, namespace2])
})
