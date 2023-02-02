import { saveFile } from './save-file.js'
import { deleteFile } from './delete-file.js'
import { IStorageDAO } from './contract.js'

export const StorageDAO: IStorageDAO = {
  saveFile
, deleteFile
}
