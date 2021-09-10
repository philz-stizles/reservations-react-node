export default {
  get: {
    summary: 'Get a category by its slug',
    tags: ['Categories'],
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
        description: 'Category slug',
      },
    ],
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
