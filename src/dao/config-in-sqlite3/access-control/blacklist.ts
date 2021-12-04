import { getDatabase } from '../database'
import { pass } from '@blackglory/pass'

export function getAllBlacklistItems(): string[] {
  const result = getDatabase().prepare(`
    SELECT namespace FROM refile_blacklist;
  `).all()
  return result.map(x => x['namespace'])
}

export function inBlacklist(namespace: string): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_blacklist
              WHERE namespace = $namespace
           ) AS exist_in_blacklist;
  `).get({ namespace })
  return result['exist_in_blacklist'] === 1
}

export function addBlacklistItem(namespace: string) {
  try {
    getDatabase().prepare(`
      INSERT INTO refile_blacklist (namespace)
      VALUES ($namespace);
    `).run({ namespace })
  } catch {
    pass()
  }
}

export function removeBlacklistItem(namespace: string) {
  getDatabase().prepare(`
    DELETE FROM refile_blacklist
     WHERE namespace = $namespace;
  `).run({ namespace })
}
