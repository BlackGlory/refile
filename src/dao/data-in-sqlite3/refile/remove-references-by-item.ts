import { getDatabase } from '../database'

export function removeReferencesByItem(namespace: string, id: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id;
  `).run({ namespace, id })
}
