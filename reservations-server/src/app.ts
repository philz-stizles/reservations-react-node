import path from 'path';
import express, { Express, Request, Response } from 'express';
import expressRateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
// import xss from 'xss';
// import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './docs';
// Middlewares.
import globalErrorHandler from '@src/middlewares/error.middleware';
import notFoundHandler from '@src/middlewares/notfound.middleware';
// Routes
import authRoutes from '@src/routes/v1/auth.routes';
// import roleRoutes from '@src/routes/v1/role.routes';
import userRoutes from '@src/routes/v1/user.routes';
import roomRoutes from '@src/routes/v1/room.routes';
import reservationRoutes from '@src/routes/v1/reservation.routes';
// import paymentRoutes from '@src/routes/v1/payment.routes';
// import transactionRoutes from '@src/routes/v1/transaction.routes';
// import couponRoutes from '@src/routes/v1/coupon.routes';
// import makerCheckerRoutes from '@src/routes/v1/maker-checker.routes';
// import auditRoutes from '@src/routes/v1/audit.routes';

// Initialize Server
const app: Express = express();

app.enable('trust proxy');

// Cors
app.use((req: Request, res: Response, next): Response | void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // A fix for graphql response with status of 405 (Method Not Allowed)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  return next();
});
// app.use((req, res, next): unknown => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.header('Access-Control-Allow-Credentials', true);

//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     // return res.status(200).json({});
//     return res.sendStatus(200);
//   }

//   return next();
// });

// CORS
app.use(
  cors()
  // origin: 'https://someurl.com'
); // cors() is a middleware which means that you can implement on specific routes as middleware

// app.options('*', cors());
// app.options('/api/v1/tours/:id', cors()) // You can also use for specific routes

// SERVING STATIC FILES
// app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'public'))); // This says, anytime there is a request from the
// server, look in the public folder e.g for http://localhost:5000/overview.html, overview should be placed
// in the root of the publis folder
app.use(express.static(path.join(__dirname, 'uploads')));

// SECURITY - Anti Cross-site Scripting - Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// LOGGING - DEVELOPMENT
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// SECURITY - Anti Brute Force Attacks - Set rate limiting
app.use(
  '/api',
  expressRateLimit({
    // By specifying api, this would then affect all the routes since they all have /api
    max: 100, // no of requests per IP
    windowMs: 60 * 60 * 1000, // per period(1 hr)
    message: {
      status: 429,
      message: 'Too many requests from this IP, please try again in an hour',
    },
  })
);

// STRIPE CHECKOUT WEBHOOK
// When we needs this body in a raw form
// app.post('/webhook-checkout', express.raw({ type: 'application/json' }), webhookCheckout);

// REQUEST BODY PARSING
app.use(express.json({ limit: '10kb' })); // This would limit the body size to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // This would limit the body size to 10kb
app.use(cookieParser()); // Parses data from cookies
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);
// SECURITY - Data sanitization against NoSQL query injection
// app.use(mongoSanitize()); // It will look at the req.body, req.query and req.params, and basically
// filter out all of the dollar($) signs and dots(.) in the values

// SECURITY - Data sanitization against XSS - cross site scripting
// app.use(xss()); // This would clean any user input from malicious html code

// SECURITY - Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'price'], // specify parameters that can be duplicated in the query
  })
);

// COMPRESSION
app.use(compression()); //

// TESTING MIDDLEWARE
app.use((req: Request, res: Response, next) => {
  // console.log(req.cookies)
  next();
});

// RESOURCES ROUTES
const api = process.env.API_URL;

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/rooms`, roomRoutes);
app.use(`${api}/reservations`, reservationRoutes);
// app.use(`${api}/sub-categories`, subCategoryRoutes);
// app.use(`${api}/categories`, categoryRoutes);
// app.use(`${api}/products`, productRoutes);
// app.use(`${api}/carts`, cartRoutes);
// app.use(`${api}/orders`, orderRoutes);
// app.use(`${api}/coupons`, couponRoutes);
// app.use(`${api}/transactions`, transactionRoutes);
// app.use(`${api}/audit`, auditRoutes);
// app.use(`${api}/logs`, logRoutes);
// app.use(`${api}/maker-checker`, makerCheckerRoutes);
// app.use(`${api}/files`, fileRoutes);

// API documentation.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Handle unhandled routes - routes that are not caught by any routers
app.all('/^(?!graphql$)/', notFoundHandler);

// Global error handling.
app.use(globalErrorHandler);

export default app;
