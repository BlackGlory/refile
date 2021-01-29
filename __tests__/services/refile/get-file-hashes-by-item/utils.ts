import { RefileDAO } from '@dao'

export async function prepareFiles(namespace: string, itemId: string, fileHashes: string[]) {
  for (const fileHash of fileHashes) {
    await RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
