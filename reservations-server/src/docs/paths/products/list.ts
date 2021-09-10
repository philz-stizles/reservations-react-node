export default {
  get: {
    tags: ['Products'], // operation's tag.
    description: 'Get products', // operation's desc.
    operationId: 'getProducts', // unique operation id.
    // expected responses
    responses: {
      '200': {
        description: 'Products were retrieved',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
    },
  },
};
