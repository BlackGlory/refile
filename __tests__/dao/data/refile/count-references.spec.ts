import { RefileDAO } from '@dao/data/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('countReferences(fileHash: string): number', () => {
  it('return number', () => {
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

    const result = RefileDAO.countReferences(fileHash)

    expect(result).toBe(3)
  })
})