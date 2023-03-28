import { setReference as _setReference } from '@dao/database/set-reference.js'

export function setReference(
  namespace: string
, itemId: string
, fileHash: string
): void {
  _setReference(namespace, itemId, fileHash)
}
