import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Buyemall Ecommerce API',
      version: '1.0.0',
      description: 'An ecommerce API',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'http://www.example.com/support',
        email: 'support@example.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development server',
      },
      { url: 'http://localhost:5000/api/v1', description: 'Test server' },
      { url: 'http://localhost:5000/api/v1', description: 'Production server' },
    ],
  },
  apis: ['./src/routes/v1/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJSDoc(options);

export default openapiSpecification;
