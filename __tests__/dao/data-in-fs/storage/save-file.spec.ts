import { fs as memfs, vol } from 'memfs'
import { PassThrough } from 'stream'
import * as DAO from '@dao/data-in-fs/storage/save-file'
import '@blackglory/jest-matchers'
import * as fs from 'fs-extra'
import { getErrorPromise } from 'return-style'
import { getFilename } from './utils'

jest.mock('fs', () => memfs)

beforeEach(async () => {
  vol.reset()
  await fs.ensureDir('/tmp')
})

const CONTENT = 'hello world'
const CONTENT_LOCATION = 'b9/4d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'

describe('saveFile(steram: Node.ReadableStream): Promise<string>', () => {
  describe('stream finish', () => {
    it('returns resolved promise', async () => {
      const pass = new PassThrough()
      pass.write(CONTENT)
      pass.end()

      const result = DAO.saveFile(pass)
      const proResult = await result
      const exist = await fs.pathExists(getFilename(CONTENT_LOCATION))

      expect(result).toBePromise()
      expect(proResult).toBe(CONTENT_LOCATION)
      expect(exist).toBeTruthy()
    })
  })

  describe('stream error', () => {
    it('returns rejected promise', async () => {
      const error = new Error('custom error')
      const pass = new PassThrough()
      pass.write(CONTENT)
      setTimeout(() => pass.destroy(error), 1000)

      const result = DAO.saveFile(pass)
      const err = await getErrorPromise(result)
      const exist = await fs.pathExists(getFilename(CONTENT_LOCATION))

      expect(result).toBePromise()
      expect(err).toBe(error)
      expect(exist).toBeFalsy()
    })
  })
})
