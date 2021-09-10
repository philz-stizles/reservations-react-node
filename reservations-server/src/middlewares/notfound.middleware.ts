import { Request, Response } from 'express';

const notFoundHandler = (_request: Request, response: Response): void => {
  const message = 'Resource not found';

  response.status(404).send({ status: false, message });
};

export default notFoundHandler;
