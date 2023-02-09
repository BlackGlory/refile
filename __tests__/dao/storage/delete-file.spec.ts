import { deleteFile } from '@dao/storage/delete-file.js'
import { promises as fs } from 'fs'
import * as path from 'path'
import { pathExists, ensureDir, remove } from 'extra-filesystem'
import { getFilename } from './utils.js'

const CONTENT = 'hello world'
const CONTENT_LOCATION = 'b9/4d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'

afterEach(async () => {
  await remove(getFilename(CONTENT_LOCATION))
})

describe('deleteFile', () => {
  test('file exists', async () => {
    const filename = getFilename(CONTENT_LOCATION)
    await ensureDir(path.dirname(filename))
    await fs.writeFile(filename, CONTENT)

    const result = await deleteFile(CONTENT_LOCATION)

    const fileExist = await pathExists(filename)
    expect(result).toBeUndefined()
    expect(fileExist).toBeFalsy()
  })

  test('file does not exist', async () => {
    const filename = getFilename(CONTENT_LOCATION)
    await ensureDir(path.dirname(filename))

    const result = await deleteFile(CONTENT_LOCATION)

    const fileExist = await pathExists(filename)
    expect(result).toBeUndefined()
    expect(fileExist).toBeFalsy()
  })
})
