import { FastifyPluginAsync } from 'fastify'
import { ApolloServer, gql } from 'apollo-server-fastify'
import { DEVELOPMENT } from '@src/config'

export const routes: FastifyPluginAsync = async function routes(server, options) {
  const typeDefs = gql`
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

  const apolloServer = new ApolloServer({
    typeDefs
  , resolvers
  , playground: DEVELOPMENT
  })

  server.register(apolloServer.createHandler())
}
