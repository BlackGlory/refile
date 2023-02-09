import { IAPI } from '@src/contract.js'
import { collectGarbage } from './collect-garbage.js'
import { getAllItemIds } from './get-all-item-ids.js'
import { getAllNamespaces } from './get-all-namespaces.js'
import { getFileHashesByItemId } from './get-file-hashes-by-item-id.js'
import { getFileInfo } from './get-file-info.js'
import { getFileLocation } from './get-file-location.js'
import { getItemIdsByFileHash } from './get-item-ids-by-file-hash.js'
import { removeReference } from './remove-reference.js'
import { removeReferencesByItemId } from './remove-references-by-item-id.js'
import { removeReferencesByNamespace } from './remove-references-by-namespace.js'
import { setReference } from './set-reference.js'
import { uploadFile } from './update-file.js'

export const API: IAPI = {
  collectGarbage

, getFileInfo
, getFileLocation

, getAllNamespaces
, getAllItemIds

, getFileHashesByItemId
, getItemIdsByFileHash

, uploadFile

, setReference
, removeReference
, removeReferencesByItemId
, removeReferencesByNamespace
}
