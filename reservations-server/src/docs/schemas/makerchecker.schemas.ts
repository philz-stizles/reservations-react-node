export default {
  CategoryInput: {
    type: 'object',
    required: ['name'], // data type
    properties: {
      name: {
        type: 'string', // data-type
        description: 'The name of the new category', // desc
        example: 'Sneakers', // example of an id
      },
      description: {
        type: 'string', // data-type
        description: 'A description of the new category', // desc
        example: 'Mens sneakers', // example of a title
      },
      parent: {
        type: 'string', // data type
        description: 'The Category that this new category belongs to', // desc
        example: 'Shoes', // example of a completed value
      },
    },
    example: {
      name: 'Shoes',
      description: 'Affordable shoes',
      parent: '',
    },
  },
};
