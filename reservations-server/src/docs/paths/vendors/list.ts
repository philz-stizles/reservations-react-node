export default {
  get: {
    summary: 'Get a list of all categories',
    tags: ['Categories'],
    description: 'Get all sub-categories',
    // operationId: 'getTodos',
    parameters: [],
    responses: {
      '200': {
        description: 'Returns a list of available categories',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CategoryInput',
              },
            },
          },
        },
      },
      '400': {
        description: 'Returns a list of available categories',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              $ref: '#/components/schemas/CategoryInput',
            },
          },
        },
      },
    },
  },
};
