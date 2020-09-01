import IPFS = require('ipfs-http-client')
import { ReadableStream } from 'web-streams-polyfill/ponyfill/es2018'

export class IPFSStorageAdapter implements StorageAdapter {
  #ipfs = IPFS('http://windows:5001')

  async save(stream: NodeJS.ReadableStream): Promise<string> {
    const { cid } = await this.#ipfs.add(toReadableStream(stream))
    return cid.toString()
  }
}

function toReadableStream(stream: NodeJS.ReadableStream): ReadableStream {
  return new ReadableStream({
    start(controller) {
      stream.on('data', chunk => controller.enqueue(chunk))
      stream.on('end', () => controller.close())
      stream.on('error', err => controller.error(err))
    }
  })
}
