const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'All API Endpoints',
      version: '1.0.0',
    },
    components:{
      securitySchemes:{
        bearerAuth:{
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security:[
      {
        bearerAuth: [],
      }
    ]
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
