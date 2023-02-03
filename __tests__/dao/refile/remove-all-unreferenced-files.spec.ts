import { RefileDAO } from '@dao/refile/index.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile, hasRawFile, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeAllUnreferencedFiles(): string[]', () => {
  describe('unreferenced file', () => {
    it('remove file and return location', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })

      const result = RefileDAO.removeAllUnreferencedFiles()

      expect(result).toEqual([location])
      expect(hasRawFile(hash)).toBe(false)
    })
  })

  describe('refferenced file', () => {
    it('do nothing', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })
      setRawReference({
        id: 'id'
      , namespace: 'namespace'
      , file_hash: hash
      })

      const result = RefileDAO.removeAllUnreferencedFiles()

      expect(result).toEqual([])
      expect(hasRawFile(hash)).toBe(true)
    })
  })
})
