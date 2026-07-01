import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scalable Auth RBAC Task API Docs',
      version: '1.0.0',
      description: 'Production-ready Node/Express backend REST API document specs with JWT authentication and Role-Based Access Control.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'V1 Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token to authorize requests.',
        },
      },
    },
  },
  // Paths to files containing swagger JSDoc documentation decorators
  apis: ['./routes/v1/*.js', './routes/*.js'],
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;
