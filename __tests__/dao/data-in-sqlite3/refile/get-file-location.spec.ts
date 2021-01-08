import * as DAO from '@dao/data-in-sqlite3/refile/get-file-location'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { setRawFile } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

describe('getFileLocation(hash: string): string | null', () => {
  describe('exist', () => {
    it('return IFile', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })

      const result = DAO.getFileLocation(hash)

      expect(result).toBe(location)
    })
  })

  describe('not exist', () => {
    it('return IFile', () => {
      const hash = 'hash'

      const result = DAO.getFileLocation(hash)

      expect(result).toBeNull()
    })
  })
})
