import { getDatabase } from '../database'

export function setReference(namespace: string, id: string, fileHash: string): void {
  getDatabase().prepare(`
    INSERT OR IGNORE INTO refile_reference (namespace, id, file_hash)
    VALUES ($namespace, $id, $fileHash);
  `).run({ namespace, id, fileHash })
}
