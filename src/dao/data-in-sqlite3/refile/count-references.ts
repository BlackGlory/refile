import { getDatabase } from '../database'

export function countReferences(fileHash: string): number {
  const row = getDatabase().prepare(`
    SELECT COUNT(*) AS count
      FROM refile_reference
     WHERE file_hash = $fileHash;
  `).get({ fileHash })

  return row['count']
}
