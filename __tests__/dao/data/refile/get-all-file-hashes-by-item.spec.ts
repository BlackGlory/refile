import { RefileDAO } from '@dao/data/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'
import { toArray } from 'iterable-operator'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllFileHashesByItem(namespace: string, id: string): string[]', () => {
  it('return string[]', () => {
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

    const iter = RefileDAO.getAllFileHashes(namespace1, id)
    const result = toArray(iter)

    expect(result).toEqual(['hash1', 'hash2'])
  })
})
