import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/user.route.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerMiddleware = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);
