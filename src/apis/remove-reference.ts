import { removeReference as _removeReference } from '@dao/database/remove-reference.js'

export function removeReference(namespace: string, itemId: string, fileHash: string): void {
  _removeReference(namespace, itemId, fileHash)
}
