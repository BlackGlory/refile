import * as DAO from '@dao/data-in-sqlite3/refile/get-all-namespaces'
import { initializeDatabases, clearDatabases } from '@test/utils'
import { setRawReference } from './utils'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getAllNamespaces(): string[]', () => {
  it('return string[]', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const itemId = 'id'
    const hash = 'hash'
    setRawReference({
      namespace: namespace1
    , item_id: itemId
    , file_hash: hash
    })
    setRawReference({
      namespace: namespace2
    , item_id: itemId
    , file_hash: hash
    })

    const result = DAO.getAllNamespaces()
    const proResult = toArray(result)

    expect(result).toBeIterable()
    expect(proResult).toEqual([namespace1, namespace2])
  })
})
