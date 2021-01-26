import { getDatabase } from '../database'

export function getAllBlacklistItems(): string[] {
  const result = getDatabase().prepare(`
    SELECT namespace FROM refile_blacklist;
  `).all()
  return result.map(x => x['namespace'])
}

export function inBlacklist(id: string): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_blacklist
              WHERE namespace = $id
           ) AS exist_in_blacklist;
  `).get({ id })
  return result['exist_in_blacklist'] === 1
}

export function addBlacklistItem(id: string) {
  try {
    getDatabase().prepare(`
      INSERT INTO refile_blacklist (namespace)
      VALUES ($id);
    `).run({ id })
  } catch {}
}

export function removeBlacklistItem(id: string) {
  getDatabase().prepare(`
    DELETE FROM refile_blacklist
     WHERE namespace = $id;
  `).run({ id })
}
