export default {
  post: {
    summary: 'Login to an account',
    tags: ['Auth'],
    description: 'Login to an existing account using email ad password',
    operationId: 'AuthLogin',
    parameters: [],
    requestBody: {
      // expected request body
      required: true,
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/LoginInput', // todo input data model
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login was successful',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Response',
            },
          },
        },
      },
      404: { description: 'Dependency was not found' },
      500: { description: 'Server error' },
    },
  },
};
