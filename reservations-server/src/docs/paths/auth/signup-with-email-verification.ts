export default {
  post: {
    summary: 'Update an existing category',
    tags: ['Auth'],
    description: 'Create a new sub-category',
    // operationId: '',
    parameters: [
      {
        in: 'path',
        name: 'slug',
        schema: {
          type: 'string',
        },
        required: true,
        description: "The target category's slug",
      },
    ],
    requestBody: {
      // expected request body
      required: true,
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CategoryInput', // todo input data model
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Category was created successfully',
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
