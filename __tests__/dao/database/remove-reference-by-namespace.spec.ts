import { removeReferencesByNamespace } from '@dao/database/remove-references-by-namespace.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReferencesByNamespace', () => {
  test('reference exists', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const id = 'id'
    const fileHash = 'hash'
    setRawReference({
      namespace: namespace1
    , id
    , file_hash: fileHash
    })
    setRawReference({
      namespace: namespace2
    , id
    , file_hash: fileHash
    })

    const result = removeReferencesByNamespace(namespace1)

    expect(result).toBeUndefined()
    expect(hasRawReference(namespace1, id, fileHash)).toBe(false)
    expect(hasRawReference(namespace2, id, fileHash)).toBe(true)
  })

  test('reference does not exist', () => {
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = removeReferencesByNamespace(namespace)

    expect(result).toBeUndefined()
    expect(hasRawReference(namespace, id, fileHash)).toBe(false)
  })
})
