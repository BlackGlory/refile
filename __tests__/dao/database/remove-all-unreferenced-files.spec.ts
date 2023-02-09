import { removeAllUnreferencedFiles } from '@dao/database/remove-all-unreferenced-files.js'
import { initializeDatabases, clearDatabases } from '@test/utils.js'
import { setRawFile, hasRawFile, setRawReference } from './utils.js'

beforeEach(initializeDatabases)
afterEach(clearDatabases)

describe('removeAllUnreferencedFiles', () => {
  describe('unreferenced file', () => {
    it('removes file and return location', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })

      const result = removeAllUnreferencedFiles()

      expect(result).toEqual([location])
      expect(hasRawFile(hash)).toBe(false)
    })
  })

  describe('refferenced file', () => {
    it('does nothing', () => {
      const hash = 'hash'
      const location = 'location'
      setRawFile({ hash, location })
      setRawReference({
        id: 'id'
      , namespace: 'namespace'
      , file_hash: hash
      })

      const result = removeAllUnreferencedFiles()

      expect(result).toEqual([])
      expect(hasRawFile(hash)).toBe(true)
    })
  })
})
