import { FastifyPluginAsync } from 'fastify'
import { routes as uploadFileRoutes } from './upload-file.js'
import { routes as getFileInfoRoutes } from './get-file-info.js'
import { routes as getFileLocationRoutes } from './get-file-location.js'
import { routes as getAllNamespacesRoutes } from './get-all-namespaces.js'
import { routes as getAllItemIdsRoutes } from './get-all-item-ids.js'
import { routes as getItemIdsByFileRoutes } from './get-item-ids-by-file.js'
import { routes as getFileHashesByItemRoutes } from './get-file-hashes-by-item.js'
import { routes as setReferenceRoutes } from './set-reference.js'
import { routes as removeReferenceRoutes } from './remove-reference.js'
import { routes as removeReferencesByItemRoutes } from './remove-references-by-item.js'
import { routes as removeReferencesByNamespaceRoutes } from './remove-references-by-namespace.js'
import { routes as collectGarbageRoutes } from './collect-garbage.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api }) => {
  await server.register(uploadFileRoutes, { api })
  await server.register(getFileInfoRoutes, { api })
  await server.register(getFileLocationRoutes, { api })
  await server.register(getAllNamespacesRoutes, { api })
  await server.register(getAllItemIdsRoutes, { api })
  await server.register(getItemIdsByFileRoutes, { api })
  await server.register(getFileHashesByItemRoutes, { api })
  await server.register(setReferenceRoutes, { api })
  await server.register(removeReferenceRoutes, { api })
  await server.register(removeReferencesByItemRoutes , { api })
  await server.register(removeReferencesByNamespaceRoutes, { api })
  await server.register(collectGarbageRoutes, { api })
}
