declare module 'ipfs-http-client' {
  import CID = require('cids')

  interface FileObject {
    path?: string
    content?: FileContent
    mode?: number | string
    mtime?: UnixTime
  }

  type FileContent = Uint8Array | Blob | String | Iterable<Uint8Array | number> | AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>

  type UnixTime = Date | { secs: number, nsecs?: number } | number[]

  interface IpfsInstance {
    add(data: FileContent | FileObject, options?: {
      chunker?: string
      cidVersion?: number
      hashAlg?: string
      onlyHash?: boolean
      pin?: boolean
      progress?: (progress: number) => void
      rawLeaves: boolean
      trickle: boolean
      wrapWithDirectory: boolean
      timeout: number
      signal: AbortSignal
    }): Promise<UnixFSEntry>
  }

  interface UnixFSEntry {
    path: string
    cid: CID
    // mode: number
    // mtime: { secs: number, nsecs: number }
    size: number
  }

  function IpfsFactory(address?: string): IpfsInstance

  export = IpfsFactory
}
