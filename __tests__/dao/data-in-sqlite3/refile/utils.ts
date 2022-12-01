import { getDatabase } from '@dao/data-in-sqlite3/database.js'

interface IRawFile {
  hash: string
  location: string
}

interface IRawReference {
  namespace: string
  id: string
  file_hash: string
}

export function setRawFile(file: IRawFile): IRawFile {
  getDatabase().prepare(`
    INSERT INTO refile_file (hash, location)
    VALUES ($hash, $location);
  `).run(file)

  return file
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

export function setRawReference(item: IRawReference): IRawReference {
  getDatabase().prepare(`
    INSERT INTO refile_reference (namespace, id, file_hash)
    VALUES ($namespace, $id, $file_hash);
  `).run(item)

  return item
}

export function hasRawReference(namespace: string, id: string, fileHash: string): boolean {
  return !!getRawReference(namespace, id, fileHash)
}

export function getRawReference(namespace: string, id: string, fileHash: string): IRawReference | null {
  return getDatabase().prepare(`
    SELECT *
      FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id
       AND file_hash = $fileHash;
  `).get({ namespace, id, fileHash })
}
