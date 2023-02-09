import { FastifyPluginAsync } from 'fastify'
import { routes as uploadFileRoutes } from './upload-file.js'
import { routes as getFileInfoRoutes } from './get-file-info.js'
import { routes as getFileLocationRoutes } from './get-file-location.js'
import { routes as getAllNamespacesRoutes } from './get-all-namespaces.js'
import { routes as getAllItemIdsRoutes } from './get-all-item-ids.js'
import { routes as getItemIdsByFileHashRoutes } from './get-item-ids-by-file-hash.js'
import { routes as getFileHashesByItemIdRoutes } from './get-file-hashes-by-item-id.js'
import { routes as setReferenceRoutes } from './set-reference.js'
import { routes as removeReferenceRoutes } from './remove-reference.js'
import { routes as removeReferencesByItemIdRoutes } from './remove-references-by-item-id.js'
import { routes as removeReferencesByNamespaceRoutes } from './remove-references-by-namespace.js'
import { routes as collectGarbageRoutes } from './collect-garbage.js'
import { IAPI } from '@src/contract.js'

export const routes: FastifyPluginAsync<{ API: IAPI }> = async (server, { API }) => {
  await server.register(uploadFileRoutes, { API })
  await server.register(getFileInfoRoutes, { API })
  await server.register(getFileLocationRoutes, { API })
  await server.register(getAllNamespacesRoutes, { API })
  await server.register(getAllItemIdsRoutes, { API })
  await server.register(getItemIdsByFileHashRoutes, { API })
  await server.register(getFileHashesByItemIdRoutes, { API })
  await server.register(setReferenceRoutes, { API })
  await server.register(removeReferenceRoutes, { API })
  await server.register(removeReferencesByItemIdRoutes , { API })
  await server.register(removeReferencesByNamespaceRoutes, { API })
  await server.register(collectGarbageRoutes, { API })
}
