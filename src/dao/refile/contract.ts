export interface IRefileDAO {
  getAllFileHashes(namespace: string, itemId: string): Iterable<string>
  getAllItemIdsByFileAndNamespace(fileHash: string, namespace: string): Iterable<string>
  getAllItemIdsByNamespace(namepsace: string): Iterable<string>
  getAllNamespaces(): Iterable<string>

  setFile(hash: string, location: string): void
  getFileLocation(hash: string): string | null
  removeFile(hash: string): void
  removeAllUnreferencedFiles(): string[]

  setReference(namespace: string, itemId: string, fileHash: string): void
  countReferences(fileHash: string): number
  removeReference(namespace: string, itemId: string, fileHash: string): void
  removeReferencesByFile(fileHash: string): void
  removeReferencesByItem(namespace: string, itemId: string): void
  removeReferencesByNamespace(namespace: string): void
}
