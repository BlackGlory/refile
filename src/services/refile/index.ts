import { FastifyPluginAsync } from 'fastify'
import { routes as uploadFileRoutes } from './upload-file'
import { routes as getFileInfoRoutes } from './get-file-info'
import { routes as getAllNamespacesRoutes } from './get-all-namespaces'
import { routes as getAllItemIdsRoutes } from './get-all-item-ids'
import { routes as getItemIdsByFileRoutes } from './get-item-ids-by-file'
import { routes as getFileHashesByItemRoutes } from './get-file-hashes-by-item'
import { routes as setReferenceRoutes } from './set-reference'
import { routes as removeReferenceRoutes } from './remove-reference'
import { routes as removeReferencesByItemRoutes } from './remove-references-by-item'
import { routes as removeReferencesByNamespaceRoutes } from './remove-references-by-namespace'
import { routes as collectGarbageRoutes } from './collect-garbage'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.register(uploadFileRoutes, { Core })
  server.register(getFileInfoRoutes, { Core })
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
