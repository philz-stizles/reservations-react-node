export default {
  get: {
    tags: ['Coupons'], // operation's tag.
    description: 'Get coupons', // operation's desc.
    operationId: 'getCoupons', // unique operation id.
    // expected responses
    responses: {
      '200': {
        description: 'Coupons were retrieved',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Coupon',
            },
          },
        },
      },
    },
  },
};
