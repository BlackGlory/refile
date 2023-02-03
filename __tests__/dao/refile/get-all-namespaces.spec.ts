import { RefileDAO } from '@dao/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'
import { toArray } from 'iterable-operator'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllNamespaces(): string[]', () => {
  it('return string[]', () => {
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

    const iter = RefileDAO.getAllNamespaces()
    const result = toArray(iter)

    expect(result).toEqual([namespace1, namespace2])
  })
})
