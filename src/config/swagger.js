const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API documentation for Product Management System",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;