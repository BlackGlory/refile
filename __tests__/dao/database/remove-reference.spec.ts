import { removeReference } from '@dao/database/remove-reference.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { hasRawReference, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeReference', () => {
  test('reference exists', () => {
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'
    setRawReference({
      namespace
    , id
    , file_hash: fileHash
    })

    const result = removeReference(namespace, id, fileHash)

    expect(result).toBeUndefined()
    expect(hasRawReference(namespace, id, fileHash)).toBe(false)
  })

  test('reference does not exist', () => {
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = removeReference(namespace, id, fileHash)

    expect(result).toBeUndefined()
    expect(hasRawReference(namespace, id, fileHash)).toBe(false)
  })
})
