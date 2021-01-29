import { RefileDAO } from '@dao'

export async function prepareNamespaces(namespaces: string[]) {
  const itemId = 'item-id'
  const fileHash = 'hash'
  for (const namespace of namespaces) {
    await RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
