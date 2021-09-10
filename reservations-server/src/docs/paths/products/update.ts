export default {
  put: {
    tags: ['Products'],
    description: 'Update a new product',
    operationId: 'updateProduct',
    parameters: [
      // expected params
      {
        name: 'id', // name of param
        in: 'path', // location of param
        schema: {
          $ref: '#/components/schemas/id', // id model
        },
        required: true, // mandatory
        description: 'Id of product to be updated', // short desc.
      },
    ],
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
      200: {
        description: 'Product updated successfully',
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
        description: 'Product not found', // response desc.
      },
      // response code
      500: {
        description: 'Server error', // response desc.
      },
    },
  },
};
