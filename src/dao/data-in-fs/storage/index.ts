import { saveFile } from './save-file'
import { deleteFile } from './delete-file'

export const StorageDAO: IStorageDAO = { saveFile, deleteFile }
