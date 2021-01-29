interface IFile {
  hash: string
  location: string | null
}

interface IRefileDAO {
  getAllFileHashes(namespace: string, itemId: string): Promise<string[]>
  getAllItemIdsByFileAndNamespace(fileHash: string, namespace: string): Promise<string[]>
  getAllItemIdsByNamespace(namepsace: string): AsyncIterable<string>
  getAllNamespaces(): Promise<string[]>

  setFile(hash: string, location: string): Promise<void>
  getFileLocation(hash: string): Promise<string | null>
  removeFile(hash: string): Promise<void>

  setReference(namespace: string, itemId: string, fileHash: string): Promise<void>
  countReferences(fileHash: string): Promise<number>
  removeReference(namespace: string, itemId: string, fileHash: string): Promise<void>
  removeReferencesByFile(fileHash: string): Promise<void>
  removeReferencesByItem(namespace: string, itemId: string): Promise<void>
}
