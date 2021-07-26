import { getAllFileHashes } from './get-all-file-hashes-by-item'
import { getAllItemIdsByFileAndNamespace } from './get-all-item-ids-by-file-and-namespace'
import { getAllItemIdsByNamespace } from './get-all-item-ids-by-namespace'
import { getAllNamespaces } from './get-all-namespaces'
import { setFile } from './set-file'
import { getFileLocation } from './get-file-location'
import { removeAllUnreferencedFiles } from './remove-all-unreferenced-files'
import { removeFile } from './remove-file'
import { setReference } from './set-reference'
import { countReferences } from './count-references'
import { removeReference } from './remove-reference'
import { removeReferencesByFile } from './remove-references-by-file'
import { removeReferencesByItem } from './remove-references-by-item'

export const RefileDAO: IRefileDAO = {
  getAllFileHashes: asyncifyIterable(getAllFileHashes)
, getAllItemIdsByFileAndNamespace: asyncifyIterable(getAllItemIdsByFileAndNamespace)
, getAllItemIdsByNamespace: asyncifyIterable(getAllItemIdsByNamespace)
, getAllNamespaces: asyncifyIterable(getAllNamespaces)

, setFile: asyncify(setFile)
, getFileLocation: asyncify(getFileLocation)
, removeFile: asyncify(removeFile)
, removeAllUnreferencedFiles: asyncify(removeAllUnreferencedFiles)

, setReference: asyncify(setReference)
, countReferences: asyncify(countReferences)
, removeReference: asyncify(removeReference)
, removeReferencesByFile: asyncify(removeReferencesByFile)
, removeReferencesByItem: asyncify(removeReferencesByItem)
}

function asyncify<T extends any[], U>(fn: (...args: T) => U): (...args: T) => Promise<U> {
  return async function (this: unknown, ...args: T): Promise<U> {
    return Reflect.apply(fn, this, args)
  }
}

function asyncifyIterable<T extends any[], U>(fn: (...args: T) => Iterable<U>): (...args: T) => AsyncIterable<U> {
  return async function* (this: unknown, ...args: T): AsyncIterable<U> {
    yield* Reflect.apply(fn, this, args)
  }
}
