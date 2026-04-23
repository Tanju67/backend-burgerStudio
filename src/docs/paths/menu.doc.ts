export const menuPaths = {
  "/api/v1/menu": {
    get: {
      tags: ["Menu"],
      summary: "Get all menu categories",
      description: "Retrieves a list of all menu categories from the database.",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "65f1234567890abcdef12345",
                        },
                        title: { type: "string", example: "Burgers" },
                        image: {
                          type: "string",
                          example: "https://cloudinary.com/image.jpg",
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
    post: {
      tags: ["Menu"],
      summary: "Create a new menu category",
      description:
        "Admin only. Requires a title and an image file. Image is processed via Cloudinary.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["title", "image"],
              properties: {
                title: {
                  type: "string",
                  description: "Name of the menu category",
                  example: "Desserts",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Image file to be uploaded",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Menu category created successfully",
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
                        example: "69e13b0759df0120b696856e",
                      },
                      title: {
                        type: "string",
                        example: "Desserts",
                      },
                      image: {
                        type: "string",
                        example:
                          "https://res.cloudinary.com/du7nxsqaz/image/upload/v1776368388/dh3lw49ydc4xyhgk0j6r.jpg",
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
        400: { description: "Bad Request - Validation failed" },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden - Admin only" },
      },
    },
  },
  "/api/v1/menu/{id}": {
    // GET SINGLE
    get: {
      tags: ["Menu"],
      summary: "Get single menu category",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Menu Category ID",
          example: "65f1234567890abcdef12345",
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
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "65f1234567890abcdef12345",
                      },
                      title: { type: "string", example: "Burgers" },
                      image: {
                        type: "string",
                        example: "https://cloudinary.com/image.jpg",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: { description: "Menu category not found" },
      },
    },

    // UPDATE (PATCH)
    patch: {
      tags: ["Menu"],
      summary: "Update menu category",
      description:
        "Admin only. Update title and/or image. At least one must be provided.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", example: "Updated Burger Title" },
                image: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Menu updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      title: { type: "string" },
                      image: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: "Bad Request - No update data provided" },
        404: { description: "Menu not found" },
      },
    },

    // DELETE
    delete: {
      tags: ["Menu"],
      summary: "Delete menu category",
      description:
        "Admin only. Deleting a menu will also delete all associated products (Cascade Delete).",
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
          description: "Menu and associated products deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    description: "The deleted menu category object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "65f1234567890abcdef12345",
                      },
                      title: { type: "string", example: "Burgers" },
                    },
                  },
                },
              },
            },
          },
        },
        404: { description: "Menu not found" },
      },
    },
  },
};
