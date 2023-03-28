import { getAllNamespaces as _getAllNamespaces } from '@dao/database/get-all-namespaces.js'

export function getAllNamespaces(): string[] {
  return _getAllNamespaces()
}
