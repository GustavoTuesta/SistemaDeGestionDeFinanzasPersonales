export const authDocs = {
  tag: {
    name: "Autenticación",
    description: "Endpoints de seguridad para la autenticación, inicio de sesión y registro de usuarios en el sistema.",
  },
  paths: {
    "/api/login": {
      post: {
        tags: ["Autenticación"],
        summary: "Iniciar sesión de usuario",
        description: `
Autentica a un usuario mediante sus credenciales (correo electrónico y contraseña).

### Mecanismo de Funcionamiento:
1. **Verificación de Identidad**: Valida la existencia del correo electrónico registrado en la base de datos PostgreSQL.
2. **Validación Criptográfica**: Compara el hash bcrypt de la contraseña enviada con el almacenado.
3. **Emisión de Credenciales**: Genera y firma un token JWT con el payload de identidad del usuario para el consumo de rutas protegidas.

### Efectos Secundarios:
- No produce mutaciones de balance ni inserciones de transacciones.
        `.trim(),
        operationId: "login",
        security: [],
        requestBody: {
          required: true,
          description: "Credenciales de acceso requeridas para la autenticación.",
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
            description: "Inicio de sesión exitoso. Retorna el token JWT generado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          "400": {
            description: "Cuerpo de la petición malformado, sintaxis JSON inválida o campos obligatorios ausentes.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Credenciales inválidas (contraseña incorrecta o usuario inexistente).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "422": {
            description: "Sintaxis válida pero violación de formato semántico (correo no válido).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Fallo inesperado del servidor o pérdida de conexión con la base de datos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/InternalServerErrorResponse",
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
        summary: "Registrar nuevo usuario",
        description: `
Registra una nueva cuenta de usuario en el sistema.

### Mecanismo de Funcionamiento:
1. **Unicidad**: Verifica que el correo electrónico no se encuentre registrado previamente en la base de datos.
2. **Seguridad**: Aplica validaciones de complejidad mínima (contraseña de al menos 8 caracteres).
3. **Criptografía**: Genera un salt y calcula el hash de la contraseña utilizando bcrypt (factor de costo 10).
4. **Persistencia**: Inserta el registro del usuario en PostgreSQL y excluye la contraseña del objeto de retorno.

### Efectos Secundarios:
- Crea un nuevo registro persistente de \`Usuario\` en la base de datos.
        `.trim(),
        operationId: "register",
        security: [],
        requestBody: {
          required: true,
          description: "Datos obligatorios para la creación de la cuenta de usuario.",
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
            description: "Usuario registrado satisfactoriamente en el sistema.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterResponse",
                },
              },
            },
          },
          "400": {
            description: "Cuerpo de la petición malformado o campos obligatorios ausentes.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "409": {
            description: "Conflicto por unicidad: el correo electrónico proporcionado ya está en uso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ConflictResponse",
                },
              },
            },
          },
          "422": {
            description: "Reglas de negocio insatisfechas (contraseña insegura con menos de 8 caracteres o formato de email erróneo).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Fallo inesperado del servidor o error en la inserción en base de datos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/InternalServerErrorResponse",
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
      description: "Esquema del cuerpo de la petición para autenticar un usuario existente.",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          description: "Dirección de correo electrónico asociada a la cuenta del usuario.",
          example: "juan.perez@example.com",
        },
        password: {
          type: "string",
          description: "Contraseña en texto plano para verificar contra el hash almacenado.",
          example: "MiContrasenaSegura123!",
        },
      },
    },
    LoginResponse: {
      type: "object",
      description: "Respuesta satisfactoria que contiene las credenciales de autorización.",
      required: ["token"],
      properties: {
        token: {
          type: "string",
          description: "Token de acceso JWT firmado, listo para ser utilizado en el encabezado Authorization.",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW4ucGVyZXpAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzI1MzExMDB9.s7...",
        },
      },
    },
    RegisterDto: {
      type: "object",
      description: "Esquema del cuerpo de la petición para crear una nueva cuenta de usuario.",
      required: ["name", "lastname", "email", "password"],
      properties: {
        name: {
          type: "string",
          minLength: 2,
          maxLength: 80,
          description: "Nombre o nombres de pila del usuario.",
          example: "Juan",
        },
        lastname: {
          type: "string",
          minLength: 2,
          maxLength: 80,
          description: "Apellidos del usuario.",
          example: "Pérez",
        },
        email: {
          type: "string",
          format: "email",
          description: "Correo electrónico único para identificación y acceso.",
          example: "juan.perez@example.com",
        },
        password: {
          type: "string",
          minLength: 8,
          description: "Contraseña para la cuenta (longitud mínima obligatoria de 8 caracteres).",
          example: "MiContrasenaSegura123!",
        },
      },
    },
    RegisterResponse: {
      type: "object",
      description: "Estructura del usuario recién registrado (con contraseña omitida por seguridad).",
      required: ["id", "name", "lastname", "email"],
      properties: {
        id: {
          type: "integer",
          description: "Identificador numérico autoincremental asignado al usuario en base de datos.",
          example: 1,
        },
        name: {
          type: "string",
          description: "Nombre registrado del usuario.",
          example: "Juan",
        },
        lastname: {
          type: "string",
          description: "Apellido registrado del usuario.",
          example: "Pérez",
        },
        email: {
          type: "string",
          format: "email",
          description: "Correo electrónico verificado y registrado.",
          example: "juan.perez@example.com",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          description: "Marca de tiempo ISO-8601 de la creación del registro.",
          example: "2026-10-08T04:12:00.000Z",
        },
      },
    },
  },
};
