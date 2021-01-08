import { getDatabase } from '../database'

export function getFileLocation(hash: string): string | null {
  const row = getDatabase().prepare(`
    SELECT location
      FROM refile_file
     WHERE hash = $hash;
  `).get({ hash })

  if (row) {
    return row['location']
  } else {
    return null
  }
}
