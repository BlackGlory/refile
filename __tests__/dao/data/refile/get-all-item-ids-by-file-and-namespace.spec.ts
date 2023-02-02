import { RefileDAO } from '@dao/data/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'
import { toArray } from 'iterable-operator'

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

    const iter = RefileDAO.getAllItemIdsByFileAndNamespace(hash, namespace1)
    const result = toArray(iter)

    expect(result).toEqual([itemId1, itemId2])
  })
})