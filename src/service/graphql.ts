import { FastifyPluginAsync } from 'fastify'
import gql from 'fastify-gql'
import { makeExecutableSchema } from 'graphql-tools'
import { DEVELOPMENT } from '@src/config'

export const routes: FastifyPluginAsync = async function routes(server, options) {
  const typeDefs = `
    type Query {
      "A simple type for getting started!"
      hello: String
    }
  `

  const resolvers = {
    Query: {
      hello: () => 'world'
    }
  }

  server.register(gql, {
    schema: makeExecutableSchema({ typeDefs, resolvers })
  , graphiql: DEVELOPMENT
  })
}
