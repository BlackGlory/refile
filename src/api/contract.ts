import { CustomErrorConstructor } from '@blackglory/errors'

export interface IFileInfo {
  hash: string
  location: string | null
  references: number
}

export interface IAPI {
  isAdmin(password: string): boolean

  Refile: {
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

    getFileInfo(fileHash: string): IFileInfo
    getFileLocation(fileHash: string): string | null

    getAllNamespaces(): Iterable<string>
    getAllItemIds(namespace: string): Iterable<string>
    getItemIdsByFile(namespace: string, fileHash: string): Iterable<string>
    getFileHashesByItem(namespace: string, itemId: string): Iterable<string>

    setReference(namespace: string, itemId: string, fileHash: string): void
    removeReference(namespace: string, itemId: string, fileHash: string): void
    removeReferencesByItem(namespace: string, itemId: string): void
    removeReferencesByNamespace(namespace: string): void

    collectGarbage(): void

    FileAlreadyExists: CustomErrorConstructor
    ReferencesIsZero: CustomErrorConstructor
    IncorrectHashList: CustomErrorConstructor
    IncorrectFileHash: CustomErrorConstructor
  }
}
