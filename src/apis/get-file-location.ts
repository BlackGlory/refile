import { getFileLocation as _getFileLocation } from '@dao/database/get-file-location.js'

export function getFileLocation(hash: string): string | null {
  return _getFileLocation(hash)
}
