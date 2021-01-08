import { getDatabase } from '../database'

export function getAllBlacklistItems(): string[] {
  const result = getDatabase().prepare(`
    SELECT refile_id FROM refile_blacklist;
  `).all()
  return result.map(x => x['refile_id'])
}

export function inBlacklist(id: string): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_blacklist
              WHERE refile_id = $id
           ) AS exist_in_blacklist;
  `).get({ id })
  return result['exist_in_blacklist'] === 1
}

export function addBlacklistItem(id: string) {
  try {
    getDatabase().prepare(`
      INSERT INTO refile_blacklist (refile_id)
      VALUES ($id);
    `).run({ id })
  } catch {}
}

export function removeBlacklistItem(id: string) {
  getDatabase().prepare(`
    DELETE FROM refile_blacklist
     WHERE refile_id = $id;
  `).run({ id })
}
