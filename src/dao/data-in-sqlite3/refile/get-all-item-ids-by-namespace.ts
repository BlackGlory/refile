import { getDatabase } from '../database'
import { map } from 'iterable-operator'

export function getAllItemIdsByNamespace(namespace: string): Iterable<string> {
  const iter = getDatabase().prepare(`
    SELECT DISTINCT id
      FROM refile_reference
     WHERE namespace = $namespace;
  `).iterate({ namespace })

  return map(iter, row => row['id'])
}
