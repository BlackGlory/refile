import { removeReferencesByItemId as _removeReferencesByItemId } from '@dao/database/remove-references-by-item-id.js'

export function removeReferencesByItemId(namespace: string, itemId: string): void {
  _removeReferencesByItemId(namespace, itemId)
}
