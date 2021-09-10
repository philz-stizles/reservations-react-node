export default {
  post: {
    tags: ['Products'],
    description: 'Create a new product',
    operationId: 'createProduct',
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductInput', // todo input data model
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Product created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Response',
            },
          },
        },
      },
      500: {
        description: 'Server error', // response desc
      },
    },
  },
};
