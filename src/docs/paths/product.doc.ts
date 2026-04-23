export const productPaths = {
  "/api/v1/product/menu/{menuId}": {
    get: {
      tags: ["Product"],
      summary: "Get all products in a specific menu",
      parameters: [
        {
          name: "menuId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Menu Category ID",
          example: "69b9b1fdb7f0c4488b51a63e",
        },
      ],
      responses: {
        200: {
          description: "List of products for the selected menu",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  count: { type: "integer", example: 6 },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "69b9b532b7f0c4488b51a657",
                        },
                        title: { type: "string", example: "Hamburger" },
                        description: {
                          type: "string",
                          example: "A classic favorite...",
                        },
                        price: { type: "number", example: 8.99 },
                        image: {
                          type: "string",
                          example: "https://res.cloudinary.com/...",
                        },
                        menu: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "69b9b1fdb7f0c4488b51a63e",
                            },
                            title: { type: "string", example: "burger" },
                            image: {
                              type: "string",
                              example: "https://res.cloudinary.com/...",
                            },
                            __v: { type: "integer", example: 0 },
                          },
                        },
                        __v: { type: "integer", example: 0 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/product/{menuId}": {
    post: {
      tags: ["Product"],
      summary: "Create a new product",
      description:
        "Admin only. Creates a product under a specific menu category. Requires multipart/form-data for image upload.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "menuId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The ID of the menu category this product belongs to",
          example: "69e13b0759df0120b696856e",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["title", "description", "price"],
              properties: {
                title: {
                  type: "string",
                  example: "Cheeseburger",
                  description: "Sent a product title as string ",
                },
                description: {
                  type: "string",
                  example: "Classic burger with cheddar",
                  description:
                    "Sent a description wit min 10 characters as string ",
                },
                price: {
                  type: "string",
                  description: "Sent as string in form-data",
                  example: "12.99",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Product image file",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "69e143357a702b556f37a2b3",
                      },
                      title: {
                        type: "string",
                        example: "Cheeseburger", // Boş bırakmadık
                      },
                      description: {
                        type: "string",
                        example:
                          "Classic burger with cheddar, lettuce, and special sauce", // Detaylı örnek
                      },
                      price: {
                        type: "number",
                        example: 12.99,
                      },
                      image: {
                        type: "string",
                        example:
                          "https://cloudinary.com/your-cloud/image/v12345.jpg", // URL örneği her zaman iyidir
                      },
                      menu: {
                        type: "string",
                        example: "69e13b0759df0120b696856e", // Bağlı olduğu menü ID'si
                      },
                      __v: {
                        type: "integer",
                        example: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: "Validation Error - Invalid input data" },
        401: { description: "Unauthorized - Token missing" },
        403: { description: "Forbidden - Admin only" },
      },
    },
  },
  "/api/v1/product/{id}": {
    get: {
      tags: ["Product"],
      summary: "Get single product",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          example: "69e13b0759df0120b696856e",
        },
      ],
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "69e143357a702b556f37a2b3",
                      },
                      title: {
                        type: "string",
                        example: "Double Bacon Burger",
                      },
                      description: {
                        type: "string",
                        example:
                          "Two beef patties with crispy bacon and cheddar cheese.",
                      },
                      price: {
                        type: "number",
                        example: 15.5,
                      },
                      image: {
                        type: "string",
                        example:
                          "https://res.cloudinary.com/demo/image/upload/burger.jpg",
                      },
                      menu: {
                        type: "object",

                        example: {
                          _id: "69e13b0759df0120b696856e",
                          title: "Burgers",
                        },
                        description: "The menu category details",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: { description: "Product not found" },
      },
    },
    patch: {
      tags: ["Product"],
      summary: "Update a product",
      description:
        "Admin only. Update any field or the product image. All fields are optional.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique ID of the product to update",
          example: "69e143357a702b556f37a2b3",
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Updated Burger Name",
                  description: "send a title with min 3 characters as string",
                },
                description: {
                  type: "string",
                  example: "New delicious description",
                  description: "send a description with min 10 characters",
                },
                price: {
                  type: "string",
                  description: "Sent as string, transformed to number",
                  example: "15.50",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "New image file",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "69e143357a702b556f37a2b3",
                      },
                      title: {
                        type: "string",
                        example: "Double Bacon Burger",
                      },
                      description: {
                        type: "string",
                        example:
                          "Two beef patties with crispy bacon and cheddar cheese.",
                      },
                      price: {
                        type: "number",
                        example: 15.5,
                      },
                      image: {
                        type: "string",
                        example:
                          "https://res.cloudinary.com/demo/image/upload/burger.jpg",
                      },
                      menu: {
                        type: "object",

                        example: {
                          _id: "69e13b0759df0120b696856e",
                          title: "Burgers",
                        },
                        description: "The menu category details",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: "Validation Error - Invalid data format" },
        401: { description: "Unauthorized - Token missing" },
        403: { description: "Forbidden - Admin only" },
        404: { description: "Product not found" },
      },
    },
    delete: {
      tags: ["Product"],
      summary: "Delete a product",
      description: "Admin only. Removes the product from the database.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Product deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Product deleted successfully",
                  },
                },
              },
            },
          },
        },
        404: { description: "Product not found" },
      },
    },
  },
};
