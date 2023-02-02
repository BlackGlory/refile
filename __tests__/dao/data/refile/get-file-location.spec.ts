import { RefileDAO } from '@dao/data/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('getFileLocation(hash: string): string | null', () => {
  describe('exist', () => {
    it('return IFile', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })

      const result = RefileDAO.getFileLocation(hash)

      expect(result).toBe(location)
    })
  })

  describe('not exist', () => {
    it('return IFile', () => {
      const hash = 'hash'

      const result = RefileDAO.getFileLocation(hash)

      expect(result).toBeNull()
    })
  })
})
