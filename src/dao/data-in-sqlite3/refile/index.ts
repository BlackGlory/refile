import { getAllFileHashes } from './get-all-file-hashes-by-item.js'
import { getAllItemIdsByFileAndNamespace } from './get-all-item-ids-by-file-and-namespace.js'
import { getAllItemIdsByNamespace } from './get-all-item-ids-by-namespace.js'
import { getAllNamespaces } from './get-all-namespaces.js'
import { setFile } from './set-file.js'
import { getFileLocation } from './get-file-location.js'
import { removeAllUnreferencedFiles } from './remove-all-unreferenced-files.js'
import { removeFile } from './remove-file.js'
import { setReference } from './set-reference.js'
import { countReferences } from './count-references.js'
import { removeReference } from './remove-reference.js'
import { removeReferencesByFile } from './remove-references-by-file.js'
import { removeReferencesByItem } from './remove-references-by-item.js'
import { removeReferencesByNamespace } from './remove-references-by-namespace.js'

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
, removeReferencesByNamespace: asyncify(removeReferencesByNamespace)
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
