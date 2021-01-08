import { getDatabase } from '../database'

export function setFile(hash: string, location: string): void {
  getDatabase().prepare(`
    INSERT INTO refile_file (hash, location)
    VALUES ($hash, $location)
        ON CONFLICT (hash)
        DO UPDATE SET location = $location;
  `).run({ hash, location })
}
