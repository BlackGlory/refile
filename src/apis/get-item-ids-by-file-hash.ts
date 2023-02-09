import { getAllItemIdsByFileHashAndNamespace } from '@dao/database/get-all-item-ids-by-file-hash-and-namespace.js'

export function getItemIdsByFileHash(namespace: string, fileHash: string): Iterable<string> {
  return getAllItemIdsByFileHashAndNamespace(fileHash, namespace)
}
