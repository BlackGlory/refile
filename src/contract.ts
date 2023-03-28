import { CustomError } from '@blackglory/errors'

export interface IFileInfo {
  hash: string
  location: string | null
  references: number
}

export interface IAPI {
  collectGarbage(): Promise<void>

  getFileInfo(fileHash: string): IFileInfo
  getFileLocation(fileHash: string): string | null

  getAllNamespaces(): string[]
  getAllItemIds(namespace: string): string[]

  getItemIdsByFileHash(namespace: string, fileHash: string): string[]
  getFileHashesByItemId(namespace: string, itemId: string): string[]

  /**
   * @throws {FileAlreadyExists}
   * @throws {NoReferences}
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

export class FileAlreadyExists extends CustomError {}
export class NoReferences extends CustomError {}
export class IncorrectHashList extends CustomError {}
export class IncorrectFileHash extends CustomError {}
