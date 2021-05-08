import { createFilename } from './utils/create-filename'
import { remove } from 'extra-filesystem'

export async function deleteFile(location: string): Promise<void> {
  const filename = createFilename(location)
  await remove(filename)
}
