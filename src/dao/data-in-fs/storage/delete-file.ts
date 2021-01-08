import * as fs from 'fs-extra'
import { createFilename } from './utils/create-filename'

export async function deleteFile(location: string): Promise<void> {
  const filename = createFilename(location)
  await fs.remove(filename)
}
