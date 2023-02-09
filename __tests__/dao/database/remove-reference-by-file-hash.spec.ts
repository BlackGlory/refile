import { removeReferencesByFileHash } from '@dao/database/remove-references-by-file-hash.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReferencesByFileHash', () => {
  test('reference exists', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const itemId1 = 'id-1'
    const itemId2 = 'id-2'
    const fileHash = 'hash'
    setRawReference({
      namespace: namespace1
    , id: itemId1
    , file_hash: fileHash
    })
    setRawReference({
      namespace: namespace1
    , id: itemId2
    , file_hash: fileHash
    })
    setRawReference({
      namespace: namespace2
    , id: itemId1
    , file_hash: fileHash
    })
    setRawReference({
      namespace: namespace2
    , id: itemId2
    , file_hash: fileHash
    })

    const result = removeReferencesByFileHash(fileHash)

    expect(result).toBeUndefined()
    expect(hasRawReference(namespace1, itemId1, fileHash)).toBe(false)
    expect(hasRawReference(namespace1, itemId2, fileHash)).toBe(false)
    expect(hasRawReference(namespace2, itemId1, fileHash)).toBe(false)
    expect(hasRawReference(namespace2, itemId2, fileHash)).toBe(false)
  })

  test('file does not exist', () => {
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = removeReferencesByFileHash(fileHash)

    expect(result).toBeUndefined()
    expect(hasRawReference(namespace, id, fileHash)).toBe(false)
  })
})
