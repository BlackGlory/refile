import { RefileDAO } from '@dao/index.js'

export async function prepareItems(namespace: string, fileHash: string, itemIds: string[]) {
  for (const itemId of itemIds) {
    await RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
