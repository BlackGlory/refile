import { getDatabase } from '../database'

export function removeReferencesByNamespace(namespace: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
  `).run({ namespace })
}
