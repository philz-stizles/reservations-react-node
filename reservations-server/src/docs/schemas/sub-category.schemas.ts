export default {
  SubCategoryInput: {
    type: 'object', // data type
    properties: {
      name: {
        type: 'string', // data-type
        description: 'The name of the sub-category', // desc
        example: 'Sneakers', // example of an id
      },
      description: {
        type: 'string', // data-type
        description: 'A description of the sub-category', // desc
        example: 'Mens sneakers', // example of a title
      },
      parent: {
        type: 'string', // data type
        description: 'The Category that this new category belongs to', // desc
        example: 'Shoes', // example of a completed value
      },
    },
  },
};
