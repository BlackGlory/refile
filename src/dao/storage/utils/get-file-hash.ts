import * as fs from 'fs'
import * as crypto from 'crypto'

export async function getFileHash(filename: string): Promise<string> {
  const hash = crypto.createHash('sha256')
  const stream = fs.createReadStream(filename)
  for await (const chunk of stream) {
    hash.update(chunk as crypto.BinaryLike)
  }
  return hash.digest('hex')
}
