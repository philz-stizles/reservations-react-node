import { Server } from 'http';
import { Express } from 'express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer, gql } from 'apollo-server-express';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import Redis from 'ioredis';
import { graphqlUploadExpress } from 'graphql-upload';
// GraphQL dependencies
import dataSources from '@src/graphql/data-sources';
import typeDefs from '@src/graphql/typeDefs';
import resolvers from '@src/graphql/resolvers';
import formatError from '@src/graphql/error';
import context from '@src/graphql/context';

const initGraphQL = (app: Express, server: Server): void => {
  // If your server is deployed to an environment where NODE_ENV is set to production,
  // GraphQL Playground and introspection are disabled by default. To enable them,
  // set playground: true and introspection: true
  // https://studio.apollographql.com/sandbox/explorer
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    // When running multiple instances of your server, you should use a shared cache backend.
    // This enables one server instance to use the cached result from another instance.
    cache: new BaseRedisCache({
      client: new Redis({
        host: process.env.REDIS_GRAPHQL_HOST,
      }),
    }),
    context,
    formatError, // Error formatting
    dataSources, // DataSource - MongoDB
    introspection: true,
    playground:
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
    plugins: [
      {
        async serverWillStart(): Promise<any> {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    uploads: false,
  });
  // Configure GraphQL Subscriptions
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(
        _connectionParams: Object,
        _webSocket: WebSocket,
        _context: any
      ) {
        console.log('Connected!');
      },
      onDisconnect(_webSocket: any, _context: any) {
        console.log('Disconnected!');
      },
    },
    { server, path: apolloServer.graphqlPath }
  );
  // apolloServer.installSubscriptionHandlers(server); // This enables a websocket
  // to be used for graphql. You then need to add graphql-subscriptions
  app.use(
    graphqlUploadExpress({
      maxFieldSize: 1000000, // Maximum allowed non-file multipart form field size in bytes; enough for your queries.
      maxFileSize: 10000, // Maximum allowed file size in bytes.
      maxFiles: 5, // Maximum allowed number of files.
    })
  );

  apolloServer.applyMiddleware({ app, path: '/graphql' });
};

export default initGraphQL;
