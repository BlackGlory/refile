import * as DAO from '@dao/data-in-sqlite3/refile/get-all-file-hashes-by-item'
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

describe('getAllFileHashesByItem(namespace: string, itemId: string): string[]', () => {
  it('return string[]', () => {
    const namespace1 = 'namespace-1'
    const namespace2 = 'namespace-2'
    const itemId = 'id'
    setRawReference({
      namespace: namespace1
    , item_id: itemId
    , file_hash: 'hash1'
    })
    setRawReference({
      namespace: namespace1
    , item_id: itemId
    , file_hash: 'hash2'
    })
    setRawReference({
      namespace: namespace2
    , item_id: itemId
    , file_hash: 'hash3'
    })
    setRawReference({
      namespace: namespace2
    , item_id: itemId
    , file_hash: 'hash4'
    })

    const result = DAO.getAllFileHashes(namespace1, itemId)

    expect(result).toEqual(['hash1', 'hash2'])
  })
})
