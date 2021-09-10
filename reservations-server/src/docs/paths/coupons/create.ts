export default {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Coupons'],
    description: 'Create a new coupon',
    operationId: 'createCoupon',
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CouponInput', // todo input data model
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Coupon created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Response',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized access',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/UnauthorizedError',
            },
          },
        },
      },
    },
  },
};
