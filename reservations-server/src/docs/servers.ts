export default [
  {
    url: 'http://localhost:5000/api/v1', // url
    description: 'Local server',
    variables: {
      environment: {
        default: 'api',
        enum: ['api', 'api.dev', 'api.staging'],
      },
      server: {
        default: 'https',
      },
    }, // name
  },
  {
    url: 'http://localhost:5000/api/v1', // url
    description: 'Development server', // name
  },
  {
    url: 'http://localhost:5000/api/v1', // url
    description: 'Test server', // name
  },
  {
    url: 'http://localhost:5000/api/v1', // url
    description: 'Production server', // name
  },
];
