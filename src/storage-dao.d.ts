interface IStorageDAO {
  saveFile(stream: NodeJS.ReadableStream): Promise<string>
  deleteFile(location: string): Promise<void>
}
