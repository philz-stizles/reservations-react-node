export default {
  // id model
  id: {
    type: 'string', // data type
    description: 'A unique id for a given entity/record', // desc
    example: '12345678abcde', // example of an id
  },
  slug: {
    type: 'string', // data type
    description: 'A unique name of a particular entity/record', // desc
    example: 'xyz_anc_bcd', // example of an id
  },
  Response: {
    type: 'object', // data type
    properties: {
      status: {
        type: 'boolean', // data-type
        description:
          'The status of the request, true - successful, false - failed', // desc
        example: true, // example of an id
      },
      data: {
        type: 'object', // data-type
        description: 'Additional data returned from the api', // desc
      },
      message: {
        type: 'string', // data type
        description: 'A message describing the outcome of the request', // desc
        example: 'Created successfully', // example of a completed value
      },
    },
  },
  // error model
  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string', // data type
        description: 'Error message', // desc
        example: 'Not found', // example of an error message
      },
      internal_code: {
        type: 'string', // data type
        description: 'Error internal code', // desc
        example: 'Invalid parameters', // example of an error internal code
      },
    },
  },
};
