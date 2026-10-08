export const authDocs = {
  tag: {
    name: "Autenticación",
    description: "Endpoints para inicio de sesión y registro de usuarios.",
  },
  paths: {
    "/api/login": {
      post: {
        tags: ["Autenticación"],
        summary: "Iniciar sesión",
        description: "Autentica a un usuario mediante correo electrónico y contraseña, devolviendo un token JWT firmado.",
        operationId: "login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Inicio de sesión exitoso. Retorna el token JWT.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          "400": {
            description: "Credenciales inválidas o datos incorrectos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor o usuario no encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/register": {
      post: {
        tags: ["Autenticación"],
        summary: "Registrar usuario",
        description: "Crea una nueva cuenta de usuario en el sistema con contraseña encriptada mediante bcrypt.",
        operationId: "register",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Usuario registrado satisfactoriamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterResponse",
                },
              },
            },
          },
          "400": {
            description: "Error de validación (correo ya registrado o contraseña insegura menor a 8 caracteres).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
        },
      },
    },
  },
  schemas: {
    LoginDto: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          description: "Correo electrónico del usuario",
          example: "juan.perez@example.com",
        },
        password: {
          type: "string",
          description: "Contraseña del usuario",
          example: "SecretPass123!",
        },
      },
    },
    LoginResponse: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Token de acceso JWT firmado",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW4ucGVyZXpAZXhhbXBsZS5jb20ifQ...",
        },
      },
    },
    RegisterDto: {
      type: "object",
      required: ["name", "lastname", "email", "password"],
      properties: {
        name: {
          type: "string",
          description: "Nombre del usuario",
          example: "Juan",
        },
        lastname: {
          type: "string",
          description: "Apellido del usuario",
          example: "Pérez",
        },
        email: {
          type: "string",
          format: "email",
          description: "Correo electrónico único",
          example: "juan.perez@example.com",
        },
        password: {
          type: "string",
          description: "Contraseña (mínimo 8 caracteres)",
          minLength: 8,
          example: "SecretPass123!",
        },
      },
    },
    RegisterResponse: {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Identificador único generado para el usuario",
              example: 1,
            },
            name: {
              type: "string",
              example: "Juan",
            },
            lastname: {
              type: "string",
              example: "Pérez",
            },
            email: {
              type: "string",
              example: "juan.perez@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-10-08T04:12:00.000Z",
            },
          },
        },
      },
    },
  },
};
