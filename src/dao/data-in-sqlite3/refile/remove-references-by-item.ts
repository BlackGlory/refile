import { getDatabase } from '../database'

export function removeReferencesByItem(namespace: string, itemId: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
       AND item_id = $itemId;
  `).run({ namespace, itemId })
}
