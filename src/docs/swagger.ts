import type { Options } from "swagger-jsdoc";
import { authPaths } from "./paths/auth.doc.js";
import { menuPaths } from "./paths/menu.doc.js";
import { productPaths } from "./paths/product.doc.js";
import { orderPaths } from "./paths/order.doc.js";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Burger Studio Backend API",
      version: "1.0.0",
      description: "Burger Studio App API Documentation",
    },
    servers: [
      {
        url: `http://16.170.251.184:10000`, // <--- Localhost yerine IP yaz
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      ...authPaths,
      ...menuPaths,
      ...productPaths,
      ...orderPaths,
    },
  },
  apis: [],
};
