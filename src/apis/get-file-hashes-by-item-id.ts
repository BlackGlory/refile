import { getAllFileHashesByItemId } from '@dao/database/get-all-file-hashes-by-item-id.js'

export function getFileHashesByItemId(namespace: string, itemId: string): Iterable<string> {
  return getAllFileHashesByItemId(namespace, itemId)
}
