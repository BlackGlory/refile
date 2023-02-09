import { getFileLocation } from '@dao/database/get-file-location.js'
import { countReferences } from '@dao/database/count-references.js'
import { IFileInfo } from '@src/contract.js'

export function getFileInfo(hash: string): IFileInfo {
  const location = getFileLocation(hash)
  const references = countReferences(hash)
  return {
    hash
  , location
  , references
  }
}
