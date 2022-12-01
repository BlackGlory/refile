import * as DAO from '@dao/data-in-sqlite3/refile/get-all-namespaces.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawReference } from './utils.js'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

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

    const result = DAO.getAllNamespaces()
    const proResult = toArray(result)

    expect(result).toBeIterable()
    expect(proResult).toEqual([namespace1, namespace2])
  })
})
