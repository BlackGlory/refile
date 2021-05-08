import { PassThrough } from 'stream'
import * as DAO from '@dao/data-in-fs/storage/save-file'
import '@blackglory/jest-matchers'
import { pathExists, remove } from 'extra-filesystem'
import { getErrorPromise } from 'return-style'
import { getFilename } from './utils'

const CONTENT = 'hello world'
const CONTENT_LOCATION = 'b9/4d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'

afterEach(async () => {
  await remove(getFilename(CONTENT_LOCATION))
})

describe('saveFile(steram: Node.ReadableStream): Promise<string>', () => {
  describe('stream finish', () => {
    it('returns resolved promise', async () => {
      const stream = new PassThrough()
      stream.write(CONTENT)
      stream.end()

      const result = DAO.saveFile(stream)
      const proResult = await result
      const exist = await pathExists(getFilename(CONTENT_LOCATION))

      expect(result).toBePromise()
      expect(proResult).toBe(CONTENT_LOCATION)
      expect(exist).toBeTruthy()
    })
  })

  describe('stream error', () => {
    it('returns rejected promise', async () => {
      const error = new Error('custom error')
      const stream = new PassThrough()
      stream.write(CONTENT)
      setTimeout(() => stream.destroy(error), 1000)

      const result = DAO.saveFile(stream)
      const err = await getErrorPromise(result)
      const exist = await pathExists(getFilename(CONTENT_LOCATION))

      expect(result).toBePromise()
      expect(err).toBe(error)
      expect(exist).toBeFalsy()
    })
  })
})
