// import { Router, Request, NextFunction } from 'express';
// import {
//   createReview,
//   updateReview,
//   getAllReviews,
//   getReview,
//   deleteReview,
// } from '@src/controllers/review.controllers';
// import { authenticate, authorize } from '@src/middlewares/auth.middlewares';

// // NESTED ROUTES - finalize nested routing to merge params from parent route into nested route
// const router = Router({ mergeParams: true });

// // router.param('id', checkIfExistsMiddleware)

// // Authenticate all routes after this middleware
// router.use(authenticate);

// router
//   .route('/')
//   .post(
//     authorize('user'),
//     (req: Request, _res: Response, next: NextFunction) => {
//       if (!req.body.tour) req.body.product = req.params.productId;
//       if (!req.body.creator) req.body.creator = req.user.id;
//       next();
//     },
//     createReview
//   )
//   .get((req, res, next) => {
//     if (req.params.tourId) req.query.tour = req.params.tourId;
//     next();
//   }, getAllReviews);

// router
//   .route('/:id')
//   .patch(authorize('user', 'admin'), updateReview)
//   .get(getReview)
//   .delete(authorize('user', 'admin'), deleteReview);

// module.exports = router;
