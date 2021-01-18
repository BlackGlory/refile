type Json = import('@blackglory/types').Json
type CustomErrorConstructor = import('@blackglory/errors').CustomErrorConstructor

interface IFileInfo extends IFile {
  references: number
}

interface ICore {
  isAdmin(password: string): boolean

  metrics(): {
    memoryUsage: NodeJS.MemoryUsage
    cpuUsage: NodeJS.CpuUsage
    resourceUsage: NodeJS.ResourceUsage
  }

  Refile: {
    /**
     * @throws {FileAlreadyExists}
     * @throws {ReferencesIsZero}
     * @throws {IncorrectHashList}
     * @throws {IncorrectFileHash}
     */
    uploadFile(hash: string, hashList: string[], stream: NodeJS.ReadableStream): Promise<void>

    getFileInfo(fileHash: string): Promise<IFileInfo>

    listNamespaces(): Promise<string[]>
    listItems(namespace: string): Promise<string[]>
    listItemsByFile(namespace: string, fileHash: string): Promise<string[]>
    listFilesByItem(namespace: string, itemId: string): Promise<string[]>

    setReference(namespace: string, itemId: string, fileHash: string): Promise<void>
    removeReference(namespace: string, itemId: string, fileHash: string): Promise<void>
    removeReferencesByItem(namespace: string, itemId: string): Promise<void>

    FileAlreadyExists: CustomErrorConstructor
    ReferencesIsZero: CustomErrorConstructor
    IncorrectHashList: CustomErrorConstructor
    IncorrectFileHash: CustomErrorConstructor
  }

  Blacklist: {
    isEnabled(): boolean
    isBlocked(id: string): Promise<boolean>
    getAll(): Promise<string[]>
    add(id: string): Promise<void>
    remove(id: string): Promise<void>

    /**
     * @throws {Forbidden}
     */
    check(id: string): Promise<void>
    Forbidden: CustomErrorConstructor
  }

  Whitelist: {
    isEnabled(): boolean
    isBlocked(id: string): Promise<boolean>
    getAll(): Promise<string[]>
    add(id: string): Promise<void>
    remove(id: string): Promise<void>

    /**
     * @throws {Forbidden}
     */
    check(id: string): Promise<void>
    Forbidden: CustomErrorConstructor
  }

  TBAC: {
    isEnabled(): boolean

    /**
     * @throws {Unauthorized}
     */
    checkWritePermission(id: string, token?: string): Promise<void>

    /**
     * @throws {Unauthorized}
     */
    checkReadPermission(id: string, token?: string): Promise<void>

    /**
     * @throws {Unauthorized}
     */
    checkDeletePermission(id: string, token?: string): Promise<void>

    Unauthorized: CustomErrorConstructor

    Token: {
      getAllIds(): Promise<string[]>
      getAll(id: string): Promise<Array<{
        token: string
        write: boolean
        read: boolean
        delete: boolean
      }>>

      setWriteToken(id: string, token: string): Promise<void>
      unsetWriteToken(id: string, token: string): Promise<void>

      setReadToken(id: string, token: string): Promise<void>
      unsetReadToken(id: string, token: string): Promise<void>

      setDeleteToken(id: string, token: string): Promise<void>
      unsetDeleteToken(id: string, token: string): Promise<void>
    }

    TokenPolicy: {
      getAllIds(): Promise<string[]>
      get(id: string): Promise<{
        writeTokenRequired: boolean | null
        readTokenRequired: boolean | null
      }>

      setWriteTokenRequired(id: string, val: boolean): Promise<void>
      unsetWriteTokenRequired(id: string): Promise<void>

      setReadTokenRequired(id: string, val: boolean): Promise<void>
      unsetReadTokenRequired(id: string): Promise<void>

      setDeleteTokenRequired(id: string, val: boolean): Promise<void>
      unsetDeleteTokenRequired(id: string): Promise<void>
    }
  }
}
