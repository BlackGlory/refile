import { createWriteStream } from 'fs'
import { createLocation } from './utils/create-location.js'
import { createFilename } from './utils/create-filename.js'
import { getFileHash } from './utils/get-file-hash.js'
import { createTempName, ensureDir } from 'extra-filesystem'
import { pipeline } from 'stream/promises'
import { remove, move } from 'extra-filesystem'
import * as path from 'path'

export function saveFile(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const tempFilename = await createTempName()

    try {
      await pipeline(
        stream
      , createWriteStream(tempFilename)
      )
    } catch (err) {
      await remove(tempFilename)
      return reject(err)
    }

    const hash = await getFileHash(tempFilename)
    const location = createLocation(hash)
    const filename = createFilename(location)
    await ensureDir(path.dirname(filename))
    await move(tempFilename, filename)
    resolve(location)
  })
}
