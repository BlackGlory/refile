import { StorageDAO } from '@dao/storage/index.js'
import { promises as fs } from 'fs'
import * as path from 'path'
import { pathExists, ensureDir } from 'extra-filesystem'
import { getFilename } from './utils.js'

const CONTENT = 'hello world'
const CONTENT_LOCATION = 'b9/4d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'

describe('deleteFile(location: string): Promise<void>', () => {
  it('return Promise<void>', async () => {
    const filename = getFilename(CONTENT_LOCATION)
    await ensureDir(path.dirname(filename))
    await fs.writeFile(filename, CONTENT)

    const result = await StorageDAO.deleteFile(CONTENT_LOCATION)
    const exist = await pathExists(filename)

    expect(result).toBeUndefined()
    expect(exist).toBeFalsy()
  })
})
