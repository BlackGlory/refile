import * as DAO from '@dao/data-in-sqlite3/refile/set-file'
import { resetDatabases, resetEnvironment } from '@test/utils'
import { getRawFile, setRawFile } from './utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

jest.mock('@dao/config-in-sqlite3/database')
jest.mock('@dao/data-in-sqlite3/database')

beforeEach(async () => {
  resetEnvironment()
  await resetDatabases()
})

describe('setFile(hash: string, location: string): void', () => {
  describe('exist', () => {
    it('update and return undefined', () => {
      const hash = 'hash'
      setRawFile({
        hash
      , location: 'old-location'
      })

      const result = DAO.setFile(hash, 'new-location')

      expect(result).toBeUndefined()
      expect(getRawFile(hash)!.location).toBe('new-location')
    })
  })

  describe('not exist', () => {
    it('insert and return undefined', () => {
      const hash = 'hash'
      const location = 'location'

      const result = DAO.setFile(hash, location)

      expect(result).toBeUndefined()
      expect(getRawFile(hash)).toEqual({ hash, location })
    })
  })
})
