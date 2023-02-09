import { removeAllUnreferencedFiles } from '@dao/database/remove-all-unreferenced-files.js'
import { deleteFile } from '@dao/storage/delete-file.js'
import { each } from 'extra-promise'

export async function collectGarbage(): Promise<void> {
  const locations = removeAllUnreferencedFiles()
  await each(locations, deleteFile)
}
