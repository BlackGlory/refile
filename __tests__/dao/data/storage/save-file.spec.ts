import { PassThrough } from 'stream'
import { StorageDAO } from '@dao/data/storage/index.js'
import { pathExists, remove } from 'extra-filesystem'
import { getErrorPromise } from 'return-style'
import { getFilename } from './utils.js'

const CONTENT = 'hello world'
const CONTENT_LOCATION = 'b9/4d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'

afterEach(async () => {
  await remove(getFilename(CONTENT_LOCATION))
})

describe('saveFile(steram: Node.ReadableStream): Promise<string>', () => {
  describe('stream finish', () => {
    it('returns resolved promise', async () => {
      function createStream(): PassThrough {
        const stream = new PassThrough()
        stream.write(CONTENT)
        stream.end()
        return stream
      }

      const result = await StorageDAO.saveFile(createStream)
      const exist = await pathExists(getFilename(CONTENT_LOCATION))

      expect(result).toBe(CONTENT_LOCATION)
      expect(exist).toBeTruthy()
    })
  })

  describe('stream error', () => {
    it('returns rejected promise', async () => {
      const error = new Error('custom error')
      function createStream(): PassThrough {
        const stream = new PassThrough()
        stream.write(CONTENT)
        setTimeout(() => stream.destroy(error), 1000)
        return stream
      }

      const err = await getErrorPromise(StorageDAO.saveFile(createStream))
      const exist = await pathExists(getFilename(CONTENT_LOCATION))

      expect(err).toBe(error)
      expect(exist).toBeFalsy()
    })
  })
})