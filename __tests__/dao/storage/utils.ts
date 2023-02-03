import { STORAGE } from '@env/index.js'
import * as path from 'path'

export function getFilename(location: string): string {
  return path.join(STORAGE(), location)
}
