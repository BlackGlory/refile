import { getDatabase } from '../database'

export function getAllFileHashes(namespace: string, itemId: string): string[] {
  const rows = getDatabase().prepare(`
    SELECT file_hash
      FROM refile_reference
     WHERE namespace = $namespace
       AND item_id = $itemId;
  `).all({ namespace, itemId })

  return rows.map(row => row['file_hash'])
}
