import { fs as memfs, vol } from 'memfs'
import * as DAO from '@dao/data-in-fs/storage/delete-file'
import '@blackglory/jest-matchers'
import * as fs from 'fs-extra'
import { getFilename } from './utils'

jest.mock('fs', () => memfs)

beforeEach(() => vol.reset())

const CONTENT = 'hello world'
const CONTENT_LOCATION = 'b9/4d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'

describe('deleteFile(location: string): Promise<void>', () => {
  it('return Promise<void>', async () => {
    const filename = getFilename(CONTENT_LOCATION)
    await fs.ensureFile(filename)
    await fs.writeFile(filename, CONTENT)

    const result = DAO.deleteFile(CONTENT_LOCATION)
    const proResult = await result
    const exist = await fs.pathExists(filename)

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(exist).toBeFalsy()
  })
})
