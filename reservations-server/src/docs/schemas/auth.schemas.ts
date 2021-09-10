export default {
  SignupInput: {
    type: 'object',
    required: ['email', 'password'], // data type
    properties: {
      fullname: {
        type: 'string', // data-type
        description: 'Full name', // desc
        example: 'Theophilus Ighalo', // example of an id
      },
      username: {
        type: 'string', // data-type
        description: 'A unique user name', // desc
        example: 'theophilus203', // example of a title
      },
      email: {
        type: 'string', // data type
        description: 'An email address', // desc
        example: 'theophilusighalo@gmail.com', // example of a completed value
      },
      password: {
        type: 'string', // data type
        description:
          'A password comprising of lower case, uppercase, numbers and special characters', // desc
        example: 'P@ssw0rd', // example of a completed value
      },
    },
    example: {
      fullname: 'Theophilus Ighalo',
      username: 'theophilus203',
      email: 'theophilusighalo@gmail.com',
      password: 'password',
    },
  },
  LoginInput: {
    type: 'object',
    required: ['email', 'password'], // data type
    properties: {
      email: {
        type: 'string', // data type
        description: 'An email address', // desc
        example: 'theophilusighalo@gmail.com', // example of a completed value
      },
      password: {
        type: 'string', // data type
        description:
          'A password comprising of lower case, uppercase, numbers and special characters', // desc
        example: 'P@ssw0rd', // example of a completed value
      },
    },
    example: {
      email: 'theophilusighalo@gmail.com',
      password: 'password',
    },
  },
};
