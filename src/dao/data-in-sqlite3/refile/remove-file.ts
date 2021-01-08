import { getDatabase } from '../database'

export function removeFile(hash: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_file
     WHERE hash = $hash;
  `).run({ hash })
}
