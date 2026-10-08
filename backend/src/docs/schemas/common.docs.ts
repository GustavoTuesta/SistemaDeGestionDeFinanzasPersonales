export const commonSchemas = {
  ErrorResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Descripción detallada del error",
        example: "Error interno del servidor",
      },
    },
    required: ["message"],
  },
  BadRequestResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Mensaje explicativo del fallo de validación",
        example: "id tiene que ser un número",
      },
    },
    required: ["message"],
  },
  NotFoundResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Mensaje de entidad no encontrada",
        example: "Usuario no encontrado",
      },
    },
    required: ["message"],
  },
};

export const securitySchemes = {
  BearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Autenticación mediante token JWT en la cabecera Authorization (formato: Bearer <token>)",
  },
};
