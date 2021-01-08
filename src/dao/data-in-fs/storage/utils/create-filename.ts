import * as path from 'path'
import { DATA } from '@env'

export function createFilename(location: string): string {
  return path.join(DATA(), 'storage', location)
}
