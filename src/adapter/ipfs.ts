import IPFS = require('ipfs-http-client')

export class IPFSStorageAdapter implements StorageAdapter {
  #ipfs = IPFS({
    host: 'windows'
  , port: 5001
  })

  async save(stream: NodeJS.ReadableStream): Promise<string> {
    const { cid } = await this.#ipfs.add(stream)
    return cid.toString()
  }
}
