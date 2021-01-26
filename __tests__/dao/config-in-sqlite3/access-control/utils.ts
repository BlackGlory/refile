import { getDatabase } from '@dao/config-in-sqlite3/database'

interface IRawBlacklist {
  namespace: string
}

interface IRawWhitelist {
  namespace: string
}

interface IRawTokenPolicy {
  namespace: string
  write_token_required: number | null
  read_token_required: number | null
  delete_token_required: number | null
}

interface IRawToken {
  token: string
  namespace: string
  write_permission: number
  read_permission: number
  delete_permission: number
}

export function setRawBlacklist(props: IRawBlacklist): void {
  getDatabase().prepare(`
    INSERT INTO refile_blacklist (namespace)
    VALUES ($namespace);
  `).run(props)
}

export function hasRawBlacklist(id: string): boolean {
  return !!getRawBlacklist(id)
}

export function getRawBlacklist(id: string): IRawBlacklist | null {
  return getDatabase().prepare(`
    SELECT *
      FROM refile_blacklist
     WHERE namespace = $id;
  `).get({ id })
}

export function setRawWhitelist(props: IRawWhitelist): void {
  getDatabase().prepare(`
    INSERT INTO refile_whitelist (namespace)
    VALUES ($namespace);
  `).run(props)
}

export function hasRawWhitelist(id: string): boolean {
  return !!getRawWhitelist(id)
}

export function getRawWhitelist(id: string): IRawWhitelist | null {
  return getDatabase().prepare(`
    SELECT *
      FROM refile_whitelist
     WHERE namespace = $id;
  `).get({ id })
}

export function setRawTokenPolicy(props: IRawTokenPolicy): void {
  getDatabase().prepare(`
    INSERT INTO refile_token_policy (
      namespace
    , write_token_required
    , read_token_required
    , delete_token_required
    )
    VALUES (
      $namespace
    , $write_token_required
    , $read_token_required
    , $delete_token_required
    );
  `).run(props)
}

export function hasRawTokenPolicy(id: string): boolean {
  return !!getRawTokenPolicy(id)
}

export function getRawTokenPolicy(id: string): IRawTokenPolicy | null {
  return getDatabase().prepare(`
    SELECT *
      FROM refile_token_policy
     WHERE namespace = $id;
  `).get({ id })
}

export function setRawToken(props: IRawToken): void {
  getDatabase().prepare(`
    INSERT INTO refile_token (
      token
    , namespace
    , write_permission
    , read_permission
    , delete_permission
    )
    VALUES (
      $token
    , $namespace
    , $write_permission
    , $read_permission
    , $delete_permission
    );
  `).run(props)
}

export function hasRawToken(token: string, id: string): boolean {
  return !!getRawToken(token, id)
}

export function getRawToken(token: string, id: string): IRawToken | null {
  return getDatabase().prepare(`
    SELECT *
      FROM refile_token
     WHERE token = $token
       AND namespace = $id;
  `).get({ token, id })
}
