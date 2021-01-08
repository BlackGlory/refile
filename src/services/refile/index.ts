import { FastifyPluginAsync } from 'fastify'
import { routes as uploadFileRoutes } from './upload-file'
import { routes as getFileInfoRoutes } from './get-file-info'
import { routes as listNamespacesRoutes } from './list-namespaces'
import { routes as listItemsRoutes } from './list-items'
import { routes as listItemsByFileRoutes } from './list-items-by-file'
import { routes as listFilesByItemRoutes } from './list-files-by-item'
import { routes as setReferenceRoutes } from './set-reference'
import { routes as removeReferenceRoutes } from './remove-reference'
import { routes as removeReferencesByItemRoutes } from './remove-references-by-item'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.register(uploadFileRoutes, { Core })
  server.register(getFileInfoRoutes, { Core })
  server.register(listNamespacesRoutes, { Core })
  server.register(listItemsRoutes, { Core })
  server.register(listItemsByFileRoutes, { Core })
  server.register(listFilesByItemRoutes, { Core })
  server.register(setReferenceRoutes, { Core })
  server.register(removeReferenceRoutes, { Core })
  server.register(removeReferencesByItemRoutes , { Core })
}
