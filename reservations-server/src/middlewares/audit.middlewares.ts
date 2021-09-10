import { NextFunction, Response, Request } from 'express';
import logger from '@src/loggers/logger';

const NAMESPACE = 'Server';

const setCreatedTime = (req: Request, res: Response, next: NextFunction) => {
  /** Log the req */
  logger.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    /** Log the res */
    logger.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
};

// eslint-disable-next-line import/prefer-default-export
export { setCreatedTime };
