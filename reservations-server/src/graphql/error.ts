import { GraphQLError, GraphQLFormattedError } from 'graphql';

export interface IErrorType {
  message: string;
  statusCode: number;
}

export const errorName = {
  NOTFOUND: 'NOTFOUND',
};

export const errorTypes: { [index: string]: IErrorType } = {
  NOTFOUND: { message: 'Requested record not found', statusCode: 404 },
};

export const getErrorCode = (name: string): IErrorType => {
  const errorType = errorTypes[name];
  return errorType;
};

const formatError = (err: GraphQLError): GraphQLFormattedError => {
  return err;
};

export default formatError;
