import { createWriteStream } from 'fs'
import { createLocation } from './utils/create-location.js'
import { createFilename } from './utils/create-filename.js'
import { getFileHash } from './utils/get-file-hash.js'
import { createTempName, ensureDir } from 'extra-filesystem'
import { pipeline } from 'stream/promises'
import { remove, move } from 'extra-filesystem'
import path from 'path'

/**
 * @param createReadableStream 传入闭包是为了保证能由saveFile捕捉到可读流中的错误.
 */
export async function saveFile(
  createReadableStream: () => NodeJS.ReadableStream
): Promise<string> {
  const tempFilename = await createTempName()

  try {
    await pipeline(
      createReadableStream()
    , createWriteStream(tempFilename)
    )
  } catch (err) {
    await remove(tempFilename)
    throw err
  }

  const hash = await getFileHash(tempFilename)
  const location = createLocation(hash)
  const filename = createFilename(location)
  await ensureDir(path.dirname(filename))
  await move(tempFilename, filename)

  return location
}
