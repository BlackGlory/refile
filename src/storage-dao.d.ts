interface IStorageDAO {
  /**
   * @param createStream 传入闭包是为了保证能由saveFile捕捉到可读流中的错误.
   */
  saveFile(createStream: () => NodeJS.ReadableStream): Promise<string>
  deleteFile(location: string): Promise<void>
}
