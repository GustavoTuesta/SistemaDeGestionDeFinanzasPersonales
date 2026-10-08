export const commonSchemas = {
  ErrorResponse: {
    type: "object",
    description: "Estructura estándar para respuestas de error genéricas.",
    properties: {
      message: {
        type: "string",
        description: "Mensaje explicativo del error ocurrido.",
        example: "Error interno del servidor",
      },
    },
    required: ["message"],
  },
  BadRequestResponse: {
    type: "object",
    description: "Estructura de error cuando la sintaxis de la petición o los parámetros son inválidos (HTTP 400).",
    properties: {
      message: {
        type: "string",
        description: "Detalle del error de sintaxis o tipo de parámetro incorrecto.",
        example: "El parámetro id debe ser un número entero mayor a 0",
      },
    },
    required: ["message"],
  },
  UnauthorizedResponse: {
    type: "object",
    description: "Estructura devuelta cuando las credenciales no son válidas o falta el token de autenticación (HTTP 401).",
    properties: {
      message: {
        type: "string",
        description: "Razón del fallo de autenticación.",
        example: "Token de autenticación no proporcionado, expirado o inválido",
      },
    },
    required: ["message"],
  },
  ForbiddenResponse: {
    type: "object",
    description: "Estructura devuelta cuando el usuario autenticado no posee los permisos suficientes para el recurso (HTTP 403).",
    properties: {
      message: {
        type: "string",
        description: "Detalle de denegación de permisos o propiedad del recurso.",
        example: "No tiene permisos para acceder o modificar este recurso",
      },
    },
    required: ["message"],
  },
  NotFoundResponse: {
    type: "object",
    description: "Estructura devuelta cuando el recurso solicitado no existe en la base de datos (HTTP 404).",
    properties: {
      message: {
        type: "string",
        description: "Identificación de la entidad o registro ausente.",
        example: "El registro solicitado no fue encontrado",
      },
    },
    required: ["message"],
  },
  ConflictResponse: {
    type: "object",
    description: "Estructura devuelta cuando ocurre un conflicto con el estado actual del recurso (HTTP 409).",
    properties: {
      message: {
        type: "string",
        description: "Descripción de la colisión de clave única o estado incompatible.",
        example: "El correo electrónico o nombre de recurso ya se encuentra registrado",
      },
    },
    required: ["message"],
  },
  UnprocessableEntityResponse: {
    type: "object",
    description: "Estructura devuelta cuando el cuerpo de la petición es sintácticamente correcto pero viola reglas de negocio (HTTP 422).",
    properties: {
      message: {
        type: "string",
        description: "Detalle de la regla de validación de negocio incumplida.",
        example: "El monto debe ser un valor numérico estrictamente mayor a 0",
      },
    },
    required: ["message"],
  },
  InternalServerErrorResponse: {
    type: "object",
    description: "Estructura devuelta cuando ocurre una excepción inesperada en el servidor o base de datos (HTTP 500).",
    properties: {
      message: {
        type: "string",
        description: "Mensaje controlado del servidor ante fallo no manejado.",
        example: "Error interno del servidor",
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
    description: "Autenticación mediante token JWT en la cabecera HTTP Authorization (formato: Bearer <token>)",
  },
};
