import { getDatabase } from '../database'
import { map } from 'iterable-operator'

export function getAllFileHashes(namespace: string, itemId: string): Iterable<string> {
  const iter = getDatabase().prepare(`
    SELECT file_hash
      FROM refile_reference
     WHERE namespace = $namespace
       AND item_id = $itemId;
  `).iterate({ namespace, itemId })

  return map(iter, row => row['file_hash'])
}
