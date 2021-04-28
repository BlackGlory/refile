import { getDatabase } from '../database'

export function removeReference(namespace: string, id: string, fileHash: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id
       AND file_hash = $fileHash;
  `).run({ namespace, id, fileHash })
}
