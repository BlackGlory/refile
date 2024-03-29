import * as path from 'path'
import { STORAGE } from '@env/index.js'

export function createFilename(location: string): string {
  return path.join(STORAGE(), location)
}
