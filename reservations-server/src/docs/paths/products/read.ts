export default {
  get: {
    tags: ['Products'],
    description: 'Get a product',
    operationId: 'getProduct',
    parameters: [
      // expected params.
      {
        name: 'slug', // name of the param
        in: 'path', // location of the param, the in property which can be path, header, query, or cookie.
        schema: {
          $ref: '#/components/schemas/slug', // data model of the param
        },
        required: true, // Mandatory param
        description: 'A single product slug', // param desc.
      },
    ],
    // expected responses
    responses: {
      200: {
        description: 'Product retrieved',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      404: {
        description: 'Product was not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
};
