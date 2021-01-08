import { getDatabase } from '../database'

export function removeReferencesByFile(fileHash: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE file_hash = $fileHash;
  `).run({ fileHash })
}
