export interface IFileInfo {
  hash: string
  location: string | null
  references: number
}

export interface IAPI {
  collectGarbage(): Promise<void>

  getFileInfo(fileHash: string): IFileInfo
  getFileLocation(fileHash: string): string | null

  getAllNamespaces(): Iterable<string>
  getAllItemIds(namespace: string): Iterable<string>

  getItemIdsByFileHash(namespace: string, fileHash: string): Iterable<string>
  getFileHashesByItemId(namespace: string, itemId: string): Iterable<string>

  /**
   * @throws {FileAlreadyExists}
   * @throws {ReferencesIsZero}
   * @throws {IncorrectHashList}
   * @throws {IncorrectFileHash}
   */
  uploadFile(
    hash: string
  , hashList: string[]
  , stream: NodeJS.ReadableStream
  ): Promise<void>

  setReference(namespace: string, itemId: string, fileHash: string): void
  removeReference(namespace: string, itemId: string, fileHash: string): void
  removeReferencesByItemId(namespace: string, itemId: string): void
  removeReferencesByNamespace(namespace: string): void
}