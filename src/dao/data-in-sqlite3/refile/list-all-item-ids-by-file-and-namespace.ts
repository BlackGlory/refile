import { getDatabase } from '../database'

export function listAllItemIdsByFileAndNamespace(fileHash: string, namespace: string): string[] {
  const rows = getDatabase().prepare(`
    SELECT item_id
      FROM refile_reference
     WHERE file_hash = $fileHash
       AND namespace = $namespace;
  `).all({ namespace, fileHash })

  return rows.map(row => row['item_id'])
}
