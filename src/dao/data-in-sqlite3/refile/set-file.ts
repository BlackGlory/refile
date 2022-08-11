import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const setFile = withLazyStatic(function (hash: string, location: string): void {
  lazyStatic(() => getDatabase().prepare(`
    INSERT INTO refile_file (hash, location)
    VALUES ($hash, $location)
        ON CONFLICT (hash)
        DO UPDATE SET location = $location;
  `), [getDatabase()]).run({ hash, location })
})
