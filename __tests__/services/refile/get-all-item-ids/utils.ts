import { RefileDAO } from '@dao'

export async function prepareItems(namespace: string, itemIds: string[]) {
  const fileHash = 'hash'
  for (const itemId of itemIds) {
    await RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
