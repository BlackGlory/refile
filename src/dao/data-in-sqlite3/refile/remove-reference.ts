import { getDatabase } from '../database'

export function removeReference(namespace: string, itemId: string, fileHash: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
       AND item_id = $itemId
       AND file_hash = $fileHash;
  `).run({ namespace, itemId, fileHash })
}
