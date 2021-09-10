export default {
  post: {
    tags: ['Sub Categories'],
    description: 'Create a new sub-category',
    // operationId: '',
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SubCategoryInput', // todo input data model
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Sub-category was created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Response',
            },
          },
        },
      },
    },
  },
};
