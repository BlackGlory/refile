import { getDatabase } from '../database'

export function listAllNamespaces(): string[] {
  const rows = getDatabase().prepare(`
    SELECT DISTINCT namespace
      FROM refile_reference;
  `).all()

  return rows.map(row => row['namespace'])
}
