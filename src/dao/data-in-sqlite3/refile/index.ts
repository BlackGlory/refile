import { listAllFileHashes } from './list-all-file-hashes-by-item'
import { listAllItemIdsByFileAndNamespace } from './list-all-item-ids-by-file-and-namespace'
import { listAllItemIdsByNamespace } from './list-all-item-ids-by-namespace'
import { listAllNamespaces } from './list-all-namespaces'
import { setFile } from './set-file'
import { getFileLocation } from './get-file-location'
import { removeFile } from './remove-file'
import { setReference } from './set-reference'
import { countReferences } from './count-references'
import { removeReference } from './remove-reference'
import { removeReferencesByFile } from './remove-references-by-file'
import { removeReferencesByItem } from './remove-references-by-item'

export const RefileDAO: IRefileDAO = {
  listAllFileHashes: asyncify(listAllFileHashes)
, listAllItemIdsByFileAndNamespace: asyncify(listAllItemIdsByFileAndNamespace)
, listAllItemIdsByNamespace: asyncifyIterable(listAllItemIdsByNamespace)
, listAllNamespaces: asyncify(listAllNamespaces)

, setFile: asyncify(setFile)
, getFileLocation: asyncify(getFileLocation)
, removeFile: asyncify(removeFile)

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
