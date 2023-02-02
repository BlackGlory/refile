import { FastifyPluginAsync } from 'fastify'
import bearerAuthPlugin from '@fastify/bearer-auth'
import { routes as blacklistRoutes } from './blacklist.js'
import { routes as whitelistRoutes } from './whitelist.js'
import { routes as tokenPolicyRoutes } from './token-policy.js'
import { routes as tokenRoutes } from './token.js'
import { IAPI } from '@api/contract.js'

export const routes: FastifyPluginAsync<{ api: IAPI }> = async (server, { api: api }) => {
  server.addContentTypeParser(
    'application/x-www-form-urlencoded'
  , { parseAs: 'string' }
  , (req, body, done) => done(null, body)
  )
  server.register(bearerAuthPlugin, {
    keys: new Set<string>() // because auth is a function, keys will be ignored.
  , auth(key, req) {
      return api.isAdmin(key)
    }
  })

  server.register(blacklistRoutes, { prefix: '/admin', api })
  server.register(whitelistRoutes, { prefix: '/admin', api })
  server.register(tokenPolicyRoutes, { prefix: '/admin', api })
  server.register(tokenRoutes, { prefix: '/admin', api })
}
