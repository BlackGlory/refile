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
import { IRefileDAO } from './contract.js'

export const RefileDAO: IRefileDAO = {
  getAllFileHashes
, getAllItemIdsByFileAndNamespace
, getAllItemIdsByNamespace
, getAllNamespaces

, setFile
, getFileLocation
, removeFile
, removeAllUnreferencedFiles

, setReference
, countReferences
, removeReference
, removeReferencesByFile
, removeReferencesByItem
, removeReferencesByNamespace
}
