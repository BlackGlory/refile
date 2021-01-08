import { getDatabase } from '../database'

export function getAllWhitelistItems(): string[] {
  const result = getDatabase().prepare(`
    SELECT refile_id FROM refile_whitelist;
  `).all()
  return result.map(x => x['refile_id'])
}

export function inWhitelist(id: string): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_whitelist
              WHERE refile_id = $id
           ) AS exist_in_whitelist;
  `).get({ id })
  return result['exist_in_whitelist'] === 1
}

export function addWhitelistItem(id: string) {
  try {
    getDatabase().prepare(`
      INSERT INTO refile_whitelist (refile_id)
      VALUES ($id);
    `).run({ id })
  } catch {}
}

export function removeWhitelistItem(id: string) {
  getDatabase().prepare(`
    DELETE FROM refile_whitelist
     WHERE refile_id = $id;
  `).run({ id })
}
