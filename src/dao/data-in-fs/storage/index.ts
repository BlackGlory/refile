import { saveFile } from './save-file.js'
import { deleteFile } from './delete-file.js'

export const StorageDAO: IStorageDAO = { saveFile, deleteFile }
