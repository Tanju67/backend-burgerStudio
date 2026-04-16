export const authPaths = {
  "/api/v1/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register a new user",
      description:
        "Creates a new user account using multipart/form-data. Useful if you decide to add profile pictures later.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["fullName", "email", "password"],
              properties: {
                fullName: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john@example.com" },
                password: { type: "string", example: "password123" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "User successfully registered",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User created successfully",
                  },
                  token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1...",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "69e03794e36840001022b4d4",
                      },
                      fullName: { type: "string", example: "Test Admin" },
                      email: { type: "string", example: "test-admin@mail.com" },
                      role: { type: "string", example: "test-admin" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                      __v: { type: "integer", example: 0 },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description:
            "Bad Request - Validation failed or email already exists",
        },
      },
    },
  },
  "/api/v1/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login user",
      description:
        "Authenticates a user with email and password, returning a JWT token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "password123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User logged in successfully",
                  },
                  token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1...",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "69e03794e36840001022b4d4",
                      },
                      fullName: { type: "string", example: "Test Admin" },
                      email: { type: "string", example: "test-admin@mail.com" },
                      role: { type: "string", example: "test-admin" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                      __v: { type: "integer", example: 0 },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized - Invalid credentials",
        },
      },
    },
  },

  "/api/v1/auth/current": {
    get: {
      tags: ["Authentication"],
      summary: "Get current user profile",
      description:
        "Returns the ID and role of the currently authenticated user based on the JWT token.",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User profile retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "69e03794e36840001022b4d4",
                      },
                      role: {
                        type: "string",
                        example: "test-admin",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized - Missing or invalid token",
        },
      },
    },
  },
};
