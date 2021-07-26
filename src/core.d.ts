type Json = import('justypes').Json
type CustomErrorConstructor = import('@blackglory/errors').CustomErrorConstructor

interface IFileInfo extends IFile {
  references: number
}

interface ICore {
  isAdmin(password: string): boolean

  Refile: {
    /**
     * @throws {FileAlreadyExists}
     * @throws {ReferencesIsZero}
     * @throws {IncorrectHashList}
     * @throws {IncorrectFileHash}
     */
    uploadFile(hash: string, hashList: string[], stream: NodeJS.ReadableStream): Promise<void>

    getFileInfo(fileHash: string): Promise<IFileInfo>

    getAllNamespaces(): AsyncIterable<string>
    getAllItemIds(namespace: string): AsyncIterable<string>
    getItemIdsByFile(namespace: string, fileHash: string): AsyncIterable<string>
    getFileHashesByItem(namespace: string, itemId: string): AsyncIterable<string>

    setReference(namespace: string, itemId: string, fileHash: string): Promise<void>
    removeReference(namespace: string, itemId: string, fileHash: string): Promise<void>
    removeReferencesByItem(namespace: string, itemId: string): Promise<void>

    collectGarbage(): Promise<void>

    FileAlreadyExists: CustomErrorConstructor
    ReferencesIsZero: CustomErrorConstructor
    IncorrectHashList: CustomErrorConstructor
    IncorrectFileHash: CustomErrorConstructor
  }

  Blacklist: {
    isEnabled(): boolean
    isBlocked(namespace: string): Promise<boolean>
    getAll(): Promise<string[]>
    add(namespace: string): Promise<void>
    remove(namespace: string): Promise<void>

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): Promise<void>
    Forbidden: CustomErrorConstructor
  }

  Whitelist: {
    isEnabled(): boolean
    isBlocked(namespace: string): Promise<boolean>
    getAll(): Promise<string[]>
    add(namespace: string): Promise<void>
    remove(namespace: string): Promise<void>

    /**
     * @throws {Forbidden}
     */
    check(namespace: string): Promise<void>
    Forbidden: CustomErrorConstructor
  }

  TBAC: {
    isEnabled(): boolean

    /**
     * @throws {Unauthorized}
     */
    checkWritePermission(namespace: string, token?: string): Promise<void>

    /**
     * @throws {Unauthorized}
     */
    checkReadPermission(namespace: string, token?: string): Promise<void>

    /**
     * @throws {Unauthorized}
     */
    checkDeletePermission(namespace: string, token?: string): Promise<void>

    Unauthorized: CustomErrorConstructor

    Token: {
      getAllNamespaces(): Promise<string[]>
      getAll(namespace: string): Promise<Array<{
        token: string
        write: boolean
        read: boolean
        delete: boolean
      }>>

      setWriteToken(namespace: string, token: string): Promise<void>
      unsetWriteToken(namespace: string, token: string): Promise<void>

      setReadToken(namespace: string, token: string): Promise<void>
      unsetReadToken(namespace: string, token: string): Promise<void>

      setDeleteToken(namespace: string, token: string): Promise<void>
      unsetDeleteToken(namespace: string, token: string): Promise<void>
    }

    TokenPolicy: {
      getAllNamespaces(): Promise<string[]>
      get(namespace: string): Promise<{
        writeTokenRequired: boolean | null
        readTokenRequired: boolean | null
      }>

      setWriteTokenRequired(namespace: string, val: boolean): Promise<void>
      unsetWriteTokenRequired(namespace: string): Promise<void>

      setReadTokenRequired(namespace: string, val: boolean): Promise<void>
      unsetReadTokenRequired(namespace: string): Promise<void>

      setDeleteTokenRequired(namespace: string, val: boolean): Promise<void>
      unsetDeleteTokenRequired(namespace: string): Promise<void>
    }
  }
}
