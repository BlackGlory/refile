import { RefileDAO } from '@dao/index.js'

export function prepareItems(namespace: string, itemIds: string[]): void {
  const fileHash = 'hash'
  for (const itemId of itemIds) {
    RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
