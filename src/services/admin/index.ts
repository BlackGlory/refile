import { FastifyPluginAsync } from 'fastify'
import bearerAuthPlugin from 'fastify-bearer-auth'
import { routes as blacklistRoutes } from './blacklist'
import { routes as whitelistRoutes } from './whitelist'
import { routes as tokenPolicyRoutes } from './token-policy'
import { routes as tokenRoutes } from './token'

export const routes: FastifyPluginAsync<{ Core: ICore }> = async function routes(server, { Core }) {
  server.addContentTypeParser(
    'application/x-www-form-urlencoded'
  , { parseAs: 'string' }
  , (req, body, done) => done(null, body)
  )
  server.register(bearerAuthPlugin, {
    keys: new Set<string>() // because auth is a function, keys will be ignored.
  , auth(key, req) {
      return Core.isAdmin(key)
    }
  })

  server.register(blacklistRoutes, { prefix: '/admin', Core })
  server.register(whitelistRoutes, { prefix: '/admin', Core })
  server.register(tokenPolicyRoutes, { prefix: '/admin', Core })
  server.register(tokenRoutes, { prefix: '/admin', Core })
}
