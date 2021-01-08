import * as path from 'path'

export function createLocation(hash: string): string {
  const dir = hash.slice(0, 2)
  const name = hash.slice(2)
  const location = path.join(dir, name)
  return location
}
