import { RefileDAO } from '@dao/data/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { getRawFile, setRawFile } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('setFile(hash: string, location: string): void', () => {
  describe('exist', () => {
    it('update and return undefined', () => {
      const hash = 'hash'
      setRawFile({
        hash
      , location: 'old-location'
      })

      const result = RefileDAO.setFile(hash, 'new-location')

      expect(result).toBeUndefined()
      expect(getRawFile(hash)!.location).toBe('new-location')
    })
  })

  describe('not exist', () => {
    it('insert and return undefined', () => {
      const hash = 'hash'
      const location = 'location'

      const result = RefileDAO.setFile(hash, location)

      expect(result).toBeUndefined()
      expect(getRawFile(hash)).toEqual({ hash, location })
    })
  })
})
