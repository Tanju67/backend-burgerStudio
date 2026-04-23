export const orderPaths = {
  "/api/v1/order": {
    get: {
      tags: ["Orders"],
      summary: "Get all orders (Admin only)",
      description:
        "Retrieves all orders with full customer profile and product details.",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of all orders retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  count: { type: "integer", example: 1 },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "65f1234567890abcdef12345",
                        },
                        status: {
                          type: "string",
                          enum: [
                            "preparing",
                            "out_for_delivery",
                            "delivered",
                            "cancelled",
                          ],
                          example: "preparing",
                        },
                        orderItems: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              product: {
                                type: "object",
                                properties: {
                                  _id: {
                                    type: "string",
                                    example: "65eabc1234567890",
                                  },
                                  title: {
                                    type: "string",
                                    example: "Classic Cheeseburger",
                                  },
                                  description: {
                                    type: "string",
                                    example:
                                      "Delicious beef patty with cheddar",
                                  },
                                  price: { type: "number", example: 12.99 },
                                  image: {
                                    type: "string",
                                    example:
                                      "https://res.cloudinary.com/demo/burger.jpg",
                                  },
                                  menu: {
                                    type: "string",
                                    example: "65e13b0759df0120b696856e",
                                  },
                                  __v: { type: "integer", example: 0 },
                                },
                              },
                              amount: { type: "integer", example: 2 },
                              price: { type: "number", example: 25.98 },
                              _id: {
                                type: "string",
                                example: "65f1234567890item1",
                              },
                            },
                          },
                        },
                        customerId: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "65d9876543210user",
                            },
                            fullName: { type: "string", example: "John Doe" },
                            city: { type: "string", example: "New York" },
                            houseNumber: { type: "string", example: "42A" },
                            phoneNumber: {
                              type: "string",
                              example: "+15551234567",
                            },
                            postalCode: { type: "string", example: "10001" },
                            street: { type: "string", example: "5th Avenue" },
                          },
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2024-03-23T10:15:00.000Z",
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example: "2024-03-23T10:20:00.000Z",
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
        401: { description: "Unauthorized - Admin access required" },
      },
    },
    post: {
      tags: ["Orders"],
      summary: "Create a new order",
      description: "Creates an order for the authenticated user.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["orderItems"],
              properties: {
                orderItems: {
                  type: "array",
                  description: "List of products being ordered",
                  items: {
                    type: "object",
                    required: ["product", "amount", "price"],
                    properties: {
                      product: {
                        type: "string",
                        description: "The unique ID of the product",
                        example: "69b9d482b7f0c4488b51a6b8",
                      },
                      amount: {
                        type: "number",
                        description: "Quantity of the product",
                        example: 2,
                      },
                      price: {
                        type: "number",
                        description:
                          "Unit price of the product at the time of order",
                        example: 150,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Order created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "66276f5a3d4a2b11c8d9e0f1",
                      },
                      status: {
                        type: "string",
                        example: "preparing",
                      },
                      orderItems: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            product: {
                              type: "string",
                              example: "65eabc1234567890", // Ürün ID'si
                            },
                            amount: {
                              type: "number",
                              example: 1,
                            },
                            price: {
                              type: "number",
                              example: 12.99,
                            },
                            _id: {
                              type: "string",
                              example: "66276f5a3d4a2b11c8d9e0f2",
                            },
                          },
                        },
                      },
                      customerId: {
                        type: "string",
                        example: "65d9876543210user", // Müşteri ID'si
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-04-23T10:30:00.000Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-04-23T10:30:00.000Z",
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
        400: { description: "Order items cannot be empty" },
        401: { description: "Unauthorized - Authentication required" },
      },
    },
  },
  "/api/v1/order/my-orders": {
    get: {
      tags: ["Orders"],
      summary: "Get my orders",
      description: "Returns all orders belonging to the logged-in user.",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User orders retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  count: { type: "integer", example: 1 },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "66276f5a3d4a2b11c8d9e0f1",
                        },
                        status: {
                          type: "string",
                          enum: [
                            "preparing",
                            "out_for_delivery",
                            "delivered",
                            "cancelled",
                          ],
                          example: "preparing",
                        },
                        orderItems: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              product: {
                                type: "object",
                                properties: {
                                  _id: {
                                    type: "string",
                                    example: "65eabc1234567890",
                                  },
                                  title: {
                                    type: "string",
                                    example: "Spicy Chicken Burger",
                                  },
                                  description: {
                                    type: "string",
                                    example: "Crispy chicken with jalapenos",
                                  },
                                  price: { type: "number", example: 14.5 },
                                  image: {
                                    type: "string",
                                    example:
                                      "https://res.cloudinary.com/demo/chicken.jpg",
                                  },
                                  menu: {
                                    type: "string",
                                    example: "65e13b0759df0120b696856e",
                                  },
                                  __v: { type: "integer", example: 0 },
                                },
                              },
                              amount: { type: "integer", example: 1 },
                              price: { type: "number", example: 14.5 },
                              _id: {
                                type: "string",
                                example: "66276f5a3d4a2b11c8d9e0f2",
                              },
                            },
                          },
                        },
                        customerId: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "65d9876543210user",
                            },
                            fullName: { type: "string", example: "John Doe" },
                            email: {
                              type: "string",
                              example: "john@example.com",
                            },
                            // Password alanı buradan kaldırıldı
                            role: { type: "string", example: "user" },
                            city: { type: "string", example: "Istanbul" },
                            houseNumber: { type: "string", example: "5/12" },
                            phoneNumber: {
                              type: "string",
                              example: "+905550000000",
                            },
                            postalCode: { type: "string", example: "34000" },
                            street: { type: "string", example: "Ataturk Cad." },
                            createdAt: {
                              type: "string",
                              format: "date-time",
                              example: "2024-01-01T10:00:00Z",
                            },
                            updatedAt: {
                              type: "string",
                              format: "date-time",
                              example: "2024-01-01T10:00:00Z",
                            },
                            __v: { type: "integer", example: 0 },
                          },
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2024-04-23T10:30:00Z",
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example: "2024-04-23T10:35:00Z",
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
        401: { description: "Unauthorized - Authentication required" },
      },
    },
  },
  "/api/v1/order/my-address": {
    get: {
      tags: ["Orders"],
      summary: "Get my delivery address",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      street: { type: "string" },
                      houseNumber: { type: "string" },
                      city: { type: "string" },
                      postalCode: { type: "string" },
                      phoneNumber: { type: "string" },
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
  "/api/v1/order/address": {
    patch: {
      tags: ["Orders"],
      summary: "Update user delivery address",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                street: { type: "string" },
                houseNumber: { type: "string" },
                city: { type: "string" },
                postalCode: { type: "string" },
                phoneNumber: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Address updated successfully" },
      },
    },
  },
  "/api/v1/order/{id}/status": {
    patch: {
      tags: ["Orders"],
      summary: "Update order status (Admin only)",
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["status"],
              properties: {
                status: {
                  type: "string",
                  enum: [
                    "preparing",
                    "out_for_delivery",
                    "delivered",
                    "cancelled",
                  ],
                  example: "out_for_delivery",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Order status updated" },
        404: { description: "Order not found" },
      },
    },
  },
};
