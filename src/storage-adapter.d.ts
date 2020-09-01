interface StorageAdapter {
  save(stream: NodeJS.ReadableStream): Promise<string>
}
