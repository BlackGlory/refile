import { RefileDAO } from '@dao/index.js'

export function prepareNamespaces(namespaces: string[]): void {
  const itemId = 'item-id'
  const fileHash = 'hash'
  for (const namespace of namespaces) {
    RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
