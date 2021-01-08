import { getDatabase } from '../database'

export function setReference(namespace: string, itemId: string, fileHash: string): void {
  getDatabase().prepare(`
    INSERT OR IGNORE INTO refile_reference (namespace, item_id, file_hash)
    VALUES ($namespace, $itemId, $fileHash);
  `).run({ namespace, itemId, fileHash })
}
