import { getAllItemIdsByNamespace } from '@dao/database/get-all-item-ids-by-namespace.js'

export function getAllItemIds(namespace: string): Iterable<string> {
  return getAllItemIdsByNamespace(namespace)
}
