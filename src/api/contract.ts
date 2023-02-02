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

  Blacklist: {
    isEnabled(): boolean
    isBlocked(namespace: string): boolean
    getAll(): string[]
    add(namespace: string): void
    remove(namespace: string): void

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): void
    Forbidden: CustomErrorConstructor
  }

  Whitelist: {
    isEnabled(): boolean
    isBlocked(namespace: string): boolean
    getAll(): string[]
    add(namespace: string): void
    remove(namespace: string): void

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): void
    Forbidden: CustomErrorConstructor
  }

  TBAC: {
    isEnabled(): boolean

    /**
     * @throws {Unauthorized}
     */
    checkWritePermission(namespace: string, token?: string): void

    /**
     * @throws {Unauthorized}
     */
    checkReadPermission(namespace: string, token?: string): void

    /**
     * @throws {Unauthorized}
     */
    checkDeletePermission(namespace: string, token?: string): void

    Unauthorized: CustomErrorConstructor

    Token: {
      getAllNamespaces(): string[]
      getAll(namespace: string): Array<{
        token: string
        write: boolean
        read: boolean
        delete: boolean
      }>

      setWriteToken(namespace: string, token: string): void
      unsetWriteToken(namespace: string, token: string): void

      setReadToken(namespace: string, token: string): void
      unsetReadToken(namespace: string, token: string): void

      setDeleteToken(namespace: string, token: string): void
      unsetDeleteToken(namespace: string, token: string): void
    }

    TokenPolicy: {
      getAllNamespaces(): string[]
      get(namespace: string): {
        writeTokenRequired: boolean | null
        readTokenRequired: boolean | null
      }

      setWriteTokenRequired(namespace: string, val: boolean): void
      unsetWriteTokenRequired(namespace: string): void

      setReadTokenRequired(namespace: string, val: boolean): void
      unsetReadTokenRequired(namespace: string): void

      setDeleteTokenRequired(namespace: string, val: boolean): void
      unsetDeleteTokenRequired(namespace: string): void
    }
  }
}
