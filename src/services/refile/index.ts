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

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.register(uploadFileRoutes, { Core })
  server.register(getFileInfoRoutes, { Core })
  server.register(getFileLocationRoutes, { Core })
  server.register(getAllNamespacesRoutes, { Core })
  server.register(getAllItemIdsRoutes, { Core })
  server.register(getItemIdsByFileRoutes, { Core })
  server.register(getFileHashesByItemRoutes, { Core })
  server.register(setReferenceRoutes, { Core })
  server.register(removeReferenceRoutes, { Core })
  server.register(removeReferencesByItemRoutes , { Core })
  server.register(removeReferencesByNamespaceRoutes, { Core })
  server.register(collectGarbageRoutes, { Core })
}
