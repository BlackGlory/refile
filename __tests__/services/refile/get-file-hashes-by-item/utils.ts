import { RefileDAO } from '@dao/index.js'

export function prepareFiles(
  namespace: string
, itemId: string
, fileHashes: string[]
): void {
  for (const fileHash of fileHashes) {
    RefileDAO.setReference(namespace, itemId, fileHash)
  }
}
