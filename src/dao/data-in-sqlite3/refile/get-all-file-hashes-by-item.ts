import { getDatabase } from '../database'
import { map } from 'iterable-operator'

export function getAllFileHashes(namespace: string, id: string): Iterable<string> {
  const iter = getDatabase().prepare(`
    SELECT file_hash
      FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id;
  `).iterate({ namespace, id })

  return map(iter, row => row['file_hash'])
}
