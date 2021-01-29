import { getDatabase } from '../database'
import { map } from 'iterable-operator'

export function getAllItemIdsByFileAndNamespace(fileHash: string, namespace: string): Iterable<string> {
  const iter = getDatabase().prepare(`
    SELECT item_id
      FROM refile_reference
     WHERE file_hash = $fileHash
       AND namespace = $namespace;
  `).iterate({ namespace, fileHash })

  return map(iter, row => row['item_id'])
}
