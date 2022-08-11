import { getDatabase } from '../database'
import { pass } from '@blackglory/pass'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllBlacklistItems = withLazyStatic(function (): string[] {
  const result = lazyStatic(() => getDatabase().prepare(`
    SELECT namespace FROM refile_blacklist;
  `), [getDatabase()]).all()

  return result.map(x => x['namespace'])
})

export const inBlacklist = withLazyStatic(function (namespace: string): boolean {
  const result = lazyStatic(() => getDatabase().prepare(`
    SELECT EXISTS(
             SELECT *
               FROM refile_blacklist
              WHERE namespace = $namespace
           ) AS exist_in_blacklist;
  `), [getDatabase()]).get({ namespace })

  return result['exist_in_blacklist'] === 1
})

export const addBlacklistItem = withLazyStatic(function (namespace: string): void {
  try {
    lazyStatic(() => getDatabase().prepare(`
      INSERT INTO refile_blacklist (namespace)
      VALUES ($namespace);
    `), [getDatabase()]).run({ namespace })
  } catch {
    pass()
  }
})

export const removeBlacklistItem = withLazyStatic(function (
  namespace: string
): void {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_blacklist
     WHERE namespace = $namespace;
  `), [getDatabase()]).run({ namespace })
})
