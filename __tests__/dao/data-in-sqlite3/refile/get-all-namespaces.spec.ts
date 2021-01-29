import * as DAO from '@dao/data-in-sqlite3/refile/get-all-namespaces'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { setRawReference } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

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

    expect(result).toEqual([namespace1, namespace2])
  })
})
