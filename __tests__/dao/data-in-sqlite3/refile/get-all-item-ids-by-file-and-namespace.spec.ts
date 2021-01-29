import * as DAO from '@dao/data-in-sqlite3/refile/get-all-item-ids-by-file-and-namespace'
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

describe('getAllItemIdsByFileAndNamespace(fileHash: string, namespace: string): string[]', () => {
  it('return string[]', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const hash = 'hash'
    const itemId1 = 'id-1'
    const itemId2 = 'id-2'
    setRawReference({
      namespace: namespace1
    , item_id: itemId1
    , file_hash: hash
    })
    setRawReference({
      namespace: namespace1
    , item_id: itemId2
    , file_hash: hash
    })
    setRawReference({
      namespace: namespace2
    , item_id: itemId1
    , file_hash: hash
    })

    const result = DAO.getAllItemIdsByFileAndNamespace(hash, namespace1)

    expect(result).toEqual([itemId1, itemId2])
  })
})
