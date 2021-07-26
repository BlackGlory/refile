import { getDatabase } from '../database'
import { isntNull } from '@blackglory/types'

export function removeAllUnreferencedFiles(): string[] {
  const locations = getDatabase().transaction(() => {
    // SQLite的DELETE不能返回被删除的行, 因此需要两条语句.
    const rows: Array<{ location: string | null }> = getDatabase().prepare(`
      SELECT location
        FROM refile_file
       WHERE NOT EXISTS(SELECT 1 FROM refile_reference WHERE file_hash = hash)
    `).all()

    // 理论上可以通过重用上个查询的结果, 通过`WHERE hash IN $hashes`避免再次查询refile_referennce表.
    // 但由于sqlite3的API不支持将数组作为参数, 实现起来很容易降低业务代码的可读性, 所以暂不对此优化.
    // https://github.com/JoshuaWise/better-sqlite3/issues/81
    getDatabase().prepare(`
      DELETE FROM refile_file
       WHERE NOT EXISTS(SELECT 1 FROM refile_reference WHERE file_hash = hash)
    `).run()

    return rows.map(x => x['location']).filter(isntNull)
  })()

  return locations
}
