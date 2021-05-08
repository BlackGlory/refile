import { promises as fs } from 'fs'
import { createWriteStream } from 'fs'
import { createLocation } from './utils/create-location'
import { createFilename } from './utils/create-filename'
import { getFileHash } from './utils/get-file-hash'
import { createTempFilename, ensureDir } from 'extra-filesystem'
import { pipeline } from 'stream'
import { remove } from 'extra-filesystem'
import * as path from 'path'

export function saveFile(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const tempFilename = await createTempFilename()

    pipeline(
      stream
    , createWriteStream(tempFilename)
    , async err => {
        if (err) {
          await remove(tempFilename)
          return reject(err)
        }

        const hash = await getFileHash(tempFilename)
        const location = createLocation(hash)
        const filename = createFilename(location)
        await ensureDir(path.dirname(filename))
        await fs.rename(tempFilename, filename)
        resolve(location)
      }
    )
  })
}
