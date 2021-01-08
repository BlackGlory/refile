import * as path from 'path'
import { path as appRoot } from 'app-root-path'

export function createFilename(location: string): string {
  return path.join(appRoot, 'data/storage', location)
}
