import { getDatabase } from '../database.js'
import { isntNull } from '@blackglory/prelude'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeAllUnreferencedFiles = withLazyStatic(function (): string[] {
  const locations = lazyStatic(() => getDatabase().transaction(() => {
    // SQLite的DELETE不能返回被删除的行, 因此需要两条语句.
    const rows: Array<{ location: string | null }> = lazyStatic(() => getDatabase().prepare(`
      SELECT location
        FROM refile_file
       WHERE NOT EXISTS(SELECT 1 FROM refile_reference WHERE file_hash = hash)
    `), [getDatabase()]).all()

    // 理论上可以通过重用上个查询的结果, 通过`WHERE hash IN $hashes`避免再次查询refile_referennce表.
    // 但由于sqlite3的API不支持将数组作为参数, 实现起来很容易降低业务代码的可读性, 所以暂不对此优化.
    // https://github.com/JoshuaWise/better-sqlite3/issues/81
    lazyStatic(() => getDatabase().prepare(`
      DELETE FROM refile_file
       WHERE NOT EXISTS(SELECT 1 FROM refile_reference WHERE file_hash = hash)
    `), [getDatabase()]).run()

    return rows.map(x => x['location']).filter(isntNull)
  }), [getDatabase()])()

  return locations
})
