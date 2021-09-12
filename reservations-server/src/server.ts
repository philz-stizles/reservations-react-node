import { Express } from 'express';
import http from 'http';
import chalk from 'chalk';
import '../dotenv-config';
import app from './app';
import dbInit from '@src/db/init';
import config from './config';
import initSocketIO from './socket';
// import initGraphQL from './graphql';

(async (expressApp: Express) => {
  if (!process.env.JWT_AUTH_SECRET) {
    throw new Error('JWT_AUTH_SECRET must be defined');
  }

  if (!config().dbUri) {
    throw new Error('DATABASE_URI must be defined');
  }

  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }

  // Initialize db.
  await dbInit();

  // initialize http server
  const httpServer = http.createServer(expressApp); // Now we have our own http instance
  // unlike with express where the server was implicitly create for us

  // Initialize GraphQL
  // initGraphQL(expressApp, httpServer);

  // Initialize Socket.io
  initSocketIO(httpServer);

  const PORT: number = parseInt(process.env.PORT as string, 10);
  const server = httpServer.listen(PORT, () => {
    console.log(
      chalk.green(`🚀 Server running on ${PORT} ${process.env.NODE_ENV}`)
    );
  });

  process.on('unhandledRejection', (err?: Error) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err?.name, err?.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully...');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
})(app);
