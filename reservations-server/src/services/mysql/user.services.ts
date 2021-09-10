import { Request, Response } from 'express';
import { Connect, Query } from '@src/db/mysql';
import logger from '@src/loggers/logger';

const NAMESPACE = 'Books';

const createUser = async (req: Request, res: Response): Promise<void> => {
  logger.info(NAMESPACE, 'Inserting user');

  const { name, email } = req.body;

  const query = `INSERT INTO users (name, email) VALUES ("${name}", "${email}")`;

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(result => {
          logger.info(NAMESPACE, 'User created: ', result);

          return res.status(200).json({
            result,
          });
        })
        .catch(error => {
          logger.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          logger.info(NAMESPACE, 'Closing connection.');
          connection.end();
        });
    })
    .catch(error => {
      logger.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error,
      });
    });
};

const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  logger.info(NAMESPACE, 'Getting all users.');

  const query = 'SELECT * FROM users';

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(results => {
          logger.info(NAMESPACE, 'Retrieved users: ', results);

          return res.status(200).json({
            results,
          });
        })
        .catch(error => {
          logger.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          logger.info(NAMESPACE, 'Closing connection.');
          connection.end();
        });
    })
    .catch(error => {
      logger.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error,
      });
    });
};

export default { createUser, getAllUsers };
