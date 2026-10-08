export const prestamosDocs = {
  tag: {
    name: "Préstamos",
    description: "Operaciones para la administración, registro, consulta y control de deudas y préstamos adquiridos u otorgados.",
  },
  paths: {
    "/api/prestamo/{id}": {
      get: {
        tags: ["Préstamos"],
        summary: "Listar préstamos por usuario",
        description: `
Obtiene el historial completo de préstamos y pasivos financieros vinculados a la cuenta de un usuario específico.

### Comportamiento del Endpoint:
- **Consulta de Pasivos**: Devuelve el identificador del préstamo, denominación descriptiva, importe adeudado o concedido y fecha de registro.
- **Idempotencia**: Consulta de solo lectura estrictamente idempotente.

### Seguridad:
- Requiere autenticación Bearer JWT.
        `.trim(),
        operationId: "listarPrestamosPorUsuario",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del usuario cuyos préstamos se desean consultar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de préstamos del usuario obtenida exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListarPrestamosResponse",
                },
              },
            },
          },
          "400": {
            description: "El parámetro de ruta id no es un número entero válido o es menor o igual a cero.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Token de autenticación faltante, expirado o con firma inválida.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "No existe ningún usuario registrado con el ID proporcionado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "500": {
            description: "Fallo inesperado del servidor o error en la consulta a la base de datos.",
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
      patch: {
        tags: ["Préstamos"],
        summary: "Actualizar préstamo existente",
        description: `
Modifica el nombre identificador y/o el monto adeudado de un préstamo existente especificado por su ID.

### Comportamiento del Endpoint:
- **Actualización Parcial**: Permite actualizar el nombre (\`nombrePrestamo\`), el importe (\`amount\`), o ambos campos.
- **Validación Semántica**: Valida que el nombre no contenga cadenas vacías o espacios en blanco y que el monto sea un valor estrictamente positivo.

### Efectos Secundarios:
- Actualiza el registro en PostgreSQL e incide en el cómputo del pasivo total del usuario.
        `.trim(),
        operationId: "actualizarPrestamo",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del registro de préstamo a modificar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 2,
            },
          },
        ],
        requestBody: {
          required: true,
          description: "Campos modificables del préstamo. Al menos uno debe ser suministrado.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ActualizarPrestamoDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Préstamo actualizado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ActualizarPrestamoResponse",
                },
              },
            },
          },
          "400": {
            description: "Error de validación (nombre de préstamo vacío o tipos numéricos incorrectos).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Falta token de autenticación o las credenciales no son válidas.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "Registro de préstamo no encontrado para el ID indicado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "422": {
            description: "Violación de regla de negocio: el monto debe ser estrictamente mayor a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor durante la actualización del préstamo.",
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
      delete: {
        tags: ["Préstamos"],
        summary: "Eliminar registro de préstamo",
        description: `
Elimina de forma permanente un registro de préstamo especificado por su ID.

### Comportamiento del Endpoint:
- **Persistencia**: Borra físicamente la fila correspondiente de la tabla de préstamos en la base de datos.
- **Idempotencia**: Devolverá 404 si el registro ya fue previamente removido.

### Efectos Secundarios:
- Cancela el pasivo registrado, eliminándolo del balance de deudas del usuario.
        `.trim(),
        operationId: "eliminarPrestamo",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del registro de préstamo que se desea eliminar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 2,
            },
          },
        ],
        responses: {
          "200": {
            description: "Préstamo eliminado exitosamente de la base de datos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EliminarPrestamoResponse",
                },
              },
            },
          },
          "400": {
            description: "El ID proporcionado en la ruta no es un número entero válido o es menor o igual a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Token de acceso no proporcionado o inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "El registro de préstamo solicitado no existe.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno en el servidor al intentar eliminar el registro.",
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
    "/api/prestamo": {
      post: {
        tags: ["Préstamos"],
        summary: "Registrar nuevo préstamo",
        description: `
Crea un nuevo registro de pasivo o préstamo vinculado a un usuario del sistema.

### Comportamiento del Endpoint:
- **Validación de Usuario**: Verifica la existencia del usuario (\`userId\`) en la base de datos.
- **Validación de Nombre**: Asegura que el nombre descriptivo del préstamo contenga al menos 1 caracter no vacío.
- **Registro Temporal**: Registra automáticamente la marca de tiempo de la creación en formato ISO-8601.

### Efectos Secundarios:
- Inserta una nueva fila en la tabla de préstamos e incrementa el total de deudas registradas del usuario.
        `.trim(),
        operationId: "crearPrestamo",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: "Datos requeridos para dar de alta un nuevo préstamo financiero.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CrearPrestamoDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Préstamo registrado exitosamente en el sistema.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CrearPrestamoResponse",
                },
              },
            },
          },
          "400": {
            description: "Nombre de préstamo vacío o tipos numéricos inválidos en el cuerpo de la petición.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Falta token de autenticación o es inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "El usuario propietario indicado no existe en la base de datos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "422": {
            description: "El monto del préstamo debe ser estrictamente mayor a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor durante la creación del préstamo.",
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
    CrearPrestamoDto: {
      type: "object",
      description: "Datos obligatorios para la creación de un nuevo registro de préstamo.",
      required: ["userId", "nombrePrestamo", "amount"],
      properties: {
        userId: {
          type: "integer",
          minimum: 1,
          description: "ID del usuario propietario del préstamo.",
          example: 1,
        },
        nombrePrestamo: {
          type: "string",
          minLength: 1,
          maxLength: 120,
          description: "Denominación descriptiva o entidad acreedora del préstamo.",
          example: "Préstamo Personal Banco Galicia",
        },
        amount: {
          type: "number",
          format: "float",
          minimum: 0.01,
          description: "Monto total del préstamo (debe ser estrictamente superior a 0).",
          example: 50000.0,
        },
      },
    },
    ActualizarPrestamoDto: {
      type: "object",
      description: "Campos permitidos para la modificación parcial de un préstamo registrado.",
      properties: {
        nombrePrestamo: {
          type: "string",
          minLength: 1,
          maxLength: 120,
          description: "Nuevo nombre o descripción identificatoria del préstamo.",
          example: "Préstamo Automotor",
        },
        amount: {
          type: "number",
          format: "float",
          minimum: 0.01,
          description: "Nuevo importe actualizado del préstamo (estrictamente superior a 0).",
          example: 45000.0,
        },
      },
    },
    PrestamoEntity: {
      type: "object",
      description: "Entidad persistida que representa un préstamo en la base de datos.",
      required: ["id", "userId", "nombrePrestamo", "amount", "date"],
      properties: {
        id: {
          type: "integer",
          description: "Identificador numérico único del préstamo.",
          example: 1,
        },
        userId: {
          type: "integer",
          description: "Identificador del usuario propietario del registro.",
          example: 1,
        },
        nombrePrestamo: {
          type: "string",
          description: "Nombre o descripción del préstamo.",
          example: "Préstamo Personal Banco Galicia",
        },
        amount: {
          type: "number",
          format: "float",
          description: "Importe del préstamo.",
          example: 50000.0,
        },
        date: {
          type: "string",
          format: "date-time",
          description: "Marca temporal en formato ISO-8601 del momento en que se registró el préstamo.",
          example: "2026-10-08T04:25:00.000Z",
        },
      },
    },
    ListarPrestamosResponse: {
      type: "object",
      description: "Respuesta estructurada con el listado de préstamos pertenecientes al usuario.",
      required: ["registros"],
      properties: {
        registros: {
          type: "array",
          description: "Arreglo con todos los registros de préstamos del usuario.",
          items: {
            $ref: "#/components/schemas/PrestamoEntity",
          },
        },
      },
    },
    CrearPrestamoResponse: {
      type: "object",
      description: "Respuesta tras la creación exitosa del préstamo.",
      required: ["registrarPrestamo"],
      properties: {
        registrarPrestamo: {
          $ref: "#/components/schemas/PrestamoEntity",
        },
      },
    },
    ActualizarPrestamoResponse: {
      type: "object",
      description: "Respuesta satisfactoria que contiene los datos del préstamo actualizados.",
      required: ["registroActualizado"],
      properties: {
        registroActualizado: {
          $ref: "#/components/schemas/PrestamoEntity",
        },
      },
    },
    EliminarPrestamoResponse: {
      type: "object",
      description: "Respuesta tras la eliminación exitosa del registro de préstamo.",
      required: ["eliminarRegistro"],
      properties: {
        eliminarRegistro: {
          $ref: "#/components/schemas/PrestamoEntity",
        },
      },
    },
  },
};
