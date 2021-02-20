import { getDatabase } from '../database'

export function getAllIdsWithTokens(): string[] {
  const result = getDatabase().prepare(`
    SELECT namespace
      FROM refile_token;
  `).all()

  return result.map(x => x['namespace'])
}

export function getAllTokens(id: string): Array<{ token: string, write: boolean, read: boolean, delete: boolean }> {
  const result: Array<{
    token: string
    'write_permission': number
    'read_permission': number
    'delete_permission': number
  }> = getDatabase().prepare(`
    SELECT token
         , write_permission
         , read_permission
         , delete_permission
      FROM refile_token
     WHERE namespace = $id;
  `).all({ id })

  return result.map(x => ({
    token: x['token']
  , write: x['write_permission'] === 1
  , read: x['read_permission'] === 1
  , delete: x['delete_permission'] === 1
  }))
}

export function hasWriteTokens(id: string): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_token
              WHERE namespace = $id
                AND write_permission = 1
           ) AS write_tokens_exist
  `).get({ id })

  return result['write_tokens_exist'] === 1
}

export function matchWriteToken({ token, id }: {
  token: string
  id: string
}): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_token
              WHERE namespace = $id
                AND token = $token
                AND write_permission = 1
           ) AS matched
  `).get({ token, id })

  return result['matched'] === 1
}

export function setWriteToken({ token, id }: { token: string; id: string }) {
  getDatabase().prepare(`
    INSERT INTO refile_token (token, namespace, write_permission)
    VALUES ($token, $id, 1)
        ON CONFLICT (token, namespace)
        DO UPDATE SET write_permission = 1;
  `).run({ token, id })
}

export function unsetWriteToken({ token, id }: { token: string; id: string }) {
  const db = getDatabase()
  db.transaction(() => {
    db.prepare(`
      UPDATE refile_token
         SET write_permission = 0
       WHERE token = $token
         AND namespace = $id;
    `).run({ token, id })

    deleteNoPermissionToken({ token, id })
  })()
}

export function hasReadTokens(id: string): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_token
              WHERE namespace = $id
                AND read_permission = 1
           ) AS read_tokens_exist
  `).get({ id })

  return result['read_tokens_exist'] === 1
}

export function matchReadToken({ token, id }: {
  token: string;
  id: string
}): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_token
              WHERE namespace = $id
                AND token = $token
                AND read_permission = 1
           ) AS matched
  `).get({ token, id })

  return result['matched'] === 1
}

export function setReadToken({ token, id }: { token: string; id: string }) {
  getDatabase().prepare(`
    INSERT INTO refile_token (token, namespace, read_permission)
    VALUES ($token, $id, 1)
        ON CONFLICT (token, namespace)
        DO UPDATE SET read_permission = 1;
  `).run({ token, id })
}

export function unsetReadToken({ token, id }: { token: string; id: string }) {
  const db = getDatabase()
  db.transaction(() => {
    db.prepare(`
      UPDATE refile_token
         SET read_permission = 0
       WHERE token = $token
         AND namespace = $id;
    `).run({ token, id })

    deleteNoPermissionToken({ token, id })
  })()
}

export function matchDeleteToken({ token, id }: {
  token: string;
  id: string
}): boolean {
  const result = getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_token
              WHERE namespace = $id
                AND token = $token
                AND delete_permission = 1
           ) AS matched
  `).get({ token, id })

  return result['matched'] === 1
}

export function setDeleteToken({ token, id }: { token: string; id: string }) {
  getDatabase().prepare(`
    INSERT INTO refile_token (token, namespace, delete_permission)
    VALUES ($token, $id, 1)
        ON CONFLICT (token, namespace)
        DO UPDATE SET delete_permission = 1;
  `).run({ token, id })
}

export function unsetDeleteToken({ token, id }: { token: string; id: string }) {
  const db = getDatabase()
  db.transaction(() => {
    db.prepare(`
      UPDATE refile_token
         SET delete_permission = 0
       WHERE token = $token
         AND namespace = $id;
    `).run({ token, id })

    deleteNoPermissionToken({ token, id })
  })()
}

function deleteNoPermissionToken({ token, id }: { token: string, id: string }) {
  getDatabase().prepare(`
    DELETE FROM refile_token
     WHERE token = $token
       AND namespace = $id
       AND write_permission = 0
       AND read_permission = 0
       AND delete_permission = 0;
  `).run({ token, id })
}
