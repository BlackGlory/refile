import { getDatabase } from '@dao/data-in-sqlite3/database'

interface IRawFile {
  hash: string
  location: string
}

interface IRawReference {
  namespace: string
  item_id: string
  file_hash: string
}

export function setRawFile({ hash, location }: IRawFile): void {
  getDatabase().prepare(`
    INSERT INTO refile_file (hash, location)
    VALUES ($hash, $location);
  `).run({ hash, location })
}

export function getRawFile(hash: string): IRawFile | null {
  const row = getDatabase().prepare(`
    SELECT *
      FROM refile_file
     WHERE hash = $hash;
  `).get({ hash })
  return row
}

export function hasRawFile(hash: string): boolean {
  return !!getRawFile(hash)
}

export function setRawReference(params: IRawReference): void {
  getDatabase().prepare(`
    INSERT INTO refile_reference (namespace, item_id, file_hash)
    VALUES ($namespace, $item_id, $file_hash);
  `).run(params)
}

export function hasRawReference(namespace: string, itemId: string, fileHash: string): boolean {
  const row = getDatabase().prepare(`
    SELECT *
      FROM refile_reference
     WHERE namespace = $namespace
       AND item_id = $itemId
       AND file_hash = $fileHash;
  `).get({ namespace, itemId, fileHash })
  return !!row
}
