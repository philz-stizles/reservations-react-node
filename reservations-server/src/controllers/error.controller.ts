// import { NextFunction, Request, Response } from 'express';
// import AppError from '../utils/appError';
// import HttpException from '../exceptions/HttpException';

// const handleCastError = err => {
//   const message = `Invalid ${err.path}: ${err.value}.`;
//   return new AppError(message, 400);
// };

// const handleDuplicateError = err => {
//   // const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
//   // const message = `Duplicate field value: ${value}. Please use another value`;
//   const message = `Duplicate ${Object.keys(err.keyValue)[0]}: ${
//     err.keyValue[Object.keys(err.keyValue)[0]]
//   }.`;
//   return new AppError(message, 400);
// };

// const handleValidationError = (validationErr: ValidationError) => {
//   const errors = Object.values(validationErr.errors).map(err => {
//     return err.message;
//   });
//   const message = `Invalid input data. ${errors.join('. ')}`;
//   return new AppError(message, 400);
// };

// const handleJWTMalformedError = () => new AppError('Invalid token, please login again', 401);

// const handleJWTExpiredError = () =>
//   new AppError('Your session has expired, please login again', 401);

// const sendDevError = (err: HttpException, req: Request, res: Response) => {
//   // API - If error is from REST API, send API response
//   if (req.originalUrl.startsWith('/api')) {
//     return res
//       .status(err.statusCode)
//       .json({ status: err.status, error: err, message: err.message, stack: err.stack });
//   }

//   // MVC WEBSITE - Else if error is from MVC, render error view page
//   console.error('ERROR 💥', err);
//   return res
//     .status(err.statusCode)
//     .render('error', { title: 'Something went wrong', message: err.message });
// };

// const sendProdError = (err: HttpException, req: Request, res: Response) => {
//   if (req.originalUrl.startsWith('/api')) {
//     if (err.isOperational) {
//       return res.status(err.statusCode).json({ status: err.status, message: err.message });
//       // Programming or other unknown error: don't leak error details
//     }

//     // Log error for developer troubleshooting
//     console.error('ERROR 💥', err);

//     // Send generic message to the user
//     return res.status(500).json({
//       status: err.status,
//       message: 'Something went wrong, try again later or contact support',
//     });
//   }

//   if (err.isOperational) {
//     return res
//       .status(err.statusCode)
//       .render('error', { title: 'Something went wrong', message: err.message });
//   }

//   console.error('ERROR 💥', err);

//   // Send generic message to the user
//   return res
//     .status(err.statusCode)
//     .render('error', { title: 'Something went wrong', message: 'Please try again later' });
// };

// exports.handleGlobalErrors = (err: HttpException, req: Request, res: Response) => {
//   console.log(err);
//   const Error = err;
//   Error.statusCode = err.statusCode || 500;
//   Error.status = err.status || false;

//   if (process.env.NODE_ENV === 'development') {
//     sendDevError(Error, req, res);
//   } else if (process.env.NODE_ENV === 'production') {
//     let error = { ...err, message: err.message };

//     if (error.name === 'CastError') error = handleCastError(error);

//     if (error.name === 'MongoError' && error.code === 11000) error = handleDuplicateError(error);

//     if (error.name === 'ValidationError') error = handleValidationError(error);

//     if (error.name === 'JsonWebTokenError') error = handleJWTMalformedError();

//     if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

//     sendProdError(error, req, res);
//   }
// };
