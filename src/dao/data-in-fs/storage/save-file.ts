import * as fs from 'fs-extra'
import { createLocation } from './utils/create-location'
import { createFilename } from './utils/create-filename'
import { getFileHash } from './utils/get-file-hash'
import { file } from 'tmp-promise'
import { pipeline } from 'stream'

export function saveFile(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const { path, cleanup } = await file()

    pipeline(
      stream
    , fs.createWriteStream(path)
    , async err => {
        if (err) {
          await cleanup()
          return reject(err)
        }

        const hash = await getFileHash(path)
        const location = createLocation(hash)
        const filename = createFilename(location)
        await fs.move(path, filename)
        resolve(location)
      }
    )
  })
}
