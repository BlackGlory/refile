import { STORAGE } from '@env'
import * as path from 'path'

export function getFilename(location: string): string {
  return path.join(STORAGE(), location)
}
