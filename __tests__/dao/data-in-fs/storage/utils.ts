import { path as appRoot } from 'app-root-path'
import * as path from 'path'

export function getFilename(location: string): string {
  return path.join(appRoot, 'data/storage', location)
}
