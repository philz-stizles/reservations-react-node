export default {
  post: {
    summary: 'Signup for a new account',
    tags: ['Auth'],
    description:
      'Signup for a new account using fullname, email, username, password',
    operationId: 'AuthSignup',
    parameters: [],
    requestBody: {
      // expected request body
      required: true,
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SignupInput', // todo input data model
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Signup was successful',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Response',
            },
          },
        },
      },
      401: { description: 'Unauthorized access' },
      404: { description: 'Dependency was not found' },
      500: { description: 'Server error' },
    },
  },
};
