export default {
  delete: {
    tags: ['Coupons'], // operation's tag.
    description: 'Archive a coupon', // operation's desc.
    operationId: 'archiveCoupon', // unique operation id.
    parameters: [
      // expected parameters
      {
        name: 'id', // name of param
        in: 'path', // location of param
        schema: {
          $ref: '#/components/schemas/id', // id model
        },
        required: true, // mandatory
        description: 'Archive a coupon that is no longer valid', // param desc
      },
    ],
    // expected responses
    responses: {
      200: {
        description: 'Coupon archived successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Response',
            },
          },
        },
      },
      // response code
      404: {
        description: 'Coupon not found', // response desc
      },
      // response code
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
