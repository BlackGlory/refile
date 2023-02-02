import { RefileDAO } from '@dao/index.js'

export function prepareItems(
  namespace: string
, fileHash: string
, itemIds: string[]
): void {
  for (const itemId of itemIds) {
    RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
