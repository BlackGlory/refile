import { getDatabase } from '../database'
import { map } from 'iterable-operator'

export function listAllItemIdsByNamespace(namespace: string): Iterable<string> {
  const iter = getDatabase().prepare(`
    SELECT DISTINCT item_id
      FROM refile_reference
     WHERE namespace = $namespace;
  `).iterate({ namespace })

  return map(iter, row => row['item_id'])
}
