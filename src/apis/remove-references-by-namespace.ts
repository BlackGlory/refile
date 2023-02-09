import { removeReferencesByNamespace as _removeReferencesByNamespace } from '@dao/database/remove-references-by-namespace.js'

export function removeReferencesByNamespace(namespace: string): void {
  _removeReferencesByNamespace(namespace)
}
