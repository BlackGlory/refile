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
  server.register(uploadFileRoutes, { api })
  server.register(getFileInfoRoutes, { api })
  server.register(getFileLocationRoutes, { api })
  server.register(getAllNamespacesRoutes, { api })
  server.register(getAllItemIdsRoutes, { api })
  server.register(getItemIdsByFileRoutes, { api })
  server.register(getFileHashesByItemRoutes, { api })
  server.register(setReferenceRoutes, { api })
  server.register(removeReferenceRoutes, { api })
  server.register(removeReferencesByItemRoutes , { api })
  server.register(removeReferencesByNamespaceRoutes, { api })
  server.register(collectGarbageRoutes, { api })
}
