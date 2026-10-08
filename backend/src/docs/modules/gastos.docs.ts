export const gastosDocs = {
  tag: {
    name: "Gastos",
    description: "Operaciones para la administración, registro, consulta y control de egresos y gastos financieros del usuario.",
  },
  paths: {
    "/api/gasto/{id}": {
      get: {
        tags: ["Gastos"],
        summary: "Listar gastos por usuario",
        description: `
Recupera el historial completo de transacciones de gastos asociadas al ID de un usuario específico.

### Comportamiento del Endpoint:
- **Consulta Relacional**: Retorna cada gasto junto a su categoría asignada, fecha de registro y monto debitado.
- **Idempotencia**: Operación de solo lectura estrictamente idempotente. No muta ningún estado en la base de datos.

### Seguridad:
- Requiere autenticación Bearer JWT.
        `.trim(),
        operationId: "listarGastosPorUsuario",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del usuario en el sistema.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de gastos del usuario obtenida exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListarGastosResponse",
                },
              },
            },
          },
          "400": {
            description: "El parámetro de ruta id no es un entero válido o es menor o igual a cero.",
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
            description: "El usuario con el ID especificado no existe en la base de datos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor o fallo de conectividad con la base de datos.",
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
        tags: ["Gastos"],
        summary: "Actualizar gasto existente",
        description: `
Modifica los valores registrados de monto y/o categoría de un gasto existente identificado por su ID.

### Comportamiento del Endpoint:
- **Actualización Parcial**: Permite actualizar el monto (\`amount\`), la categoría (\`categoryId\`), o ambos campos simultáneamente.
- **Integridad**: Si se modifica la categoría, el sistema valida que la nueva categoría exista previamente.

### Efectos Secundarios:
- Modifica el registro en PostgreSQL y recalcula el balance financiero correspondiente.
        `.trim(),
        operationId: "actualizarGasto",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del registro de gasto a modificar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 3,
            },
          },
        ],
        requestBody: {
          required: true,
          description: "Campos modificables del gasto. Debe proporcionarse al menos uno.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ActualizarGastoDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Gasto actualizado exitosamente en el sistema.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ActualizarGastoResponse",
                },
              },
            },
          },
          "201": {
            description: "Gasto actualizado exitosamente (código devuelto por controladores legacy).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ActualizarGastoResponse",
                },
              },
            },
          },
          "400": {
            description: "Sintaxis de petición inválida o tipos de datos numéricos incorrectos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Token de autorización inválido o ausente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "El registro de gasto con el ID indicado no fue encontrado en la base de datos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "422": {
            description: "Violación de regla de negocio: el monto es menor o igual a 0, o la categoría no es válida.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Fallo inesperado del servidor o error durante la transacción.",
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
        tags: ["Gastos"],
        summary: "Eliminar registro de gasto",
        description: `
Elimina de forma permanente un registro de gasto especificado por su ID.

### Comportamiento del Endpoint:
- **Persistencia**: Borra físicamente la fila correspondiente en la tabla de gastos de la base de datos.
- **Idempotencia**: Devolverá 404 si el recurso ya fue eliminado previamente.

### Efectos Secundarios:
- Remueve el registro de gasto del cálculo del balance histórico del usuario.
        `.trim(),
        operationId: "eliminarGasto",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del registro de gasto que se desea eliminar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 3,
            },
          },
        ],
        responses: {
          "200": {
            description: "Gasto eliminado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EliminarGastoResponse",
                },
              },
            },
          },
          "400": {
            description: "El parámetro de ruta id no es un número entero válido o es menor o igual a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Falta token de autenticación o el token es inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "El registro de gasto con el ID indicado no existe.",
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
    "/api/gasto": {
      post: {
        tags: ["Gastos"],
        summary: "Registrar nuevo gasto",
        description: `
Crea un nuevo registro de gasto monetario asociado a un usuario y a una categoría específica.

### Comportamiento del Endpoint:
- **Validación Relacional**: Comprueba que el usuario (\`userId\`) y la categoría (\`categoryId\`) existan en la base de datos.
- **Asignación Temporal**: Asigna automáticamente la fecha y hora de la transacción actual en formato ISO-8601.

### Efectos Secundarios:
- Inserta una nueva fila en la tabla de gastos en PostgreSQL y afecta los totales de egreso del usuario.
        `.trim(),
        operationId: "crearGasto",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: "Datos obligatorios para la creación del gasto.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CrearGastoDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Gasto registrado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CrearGastoResponse",
                },
              },
            },
          },
          "400": {
            description: "Cuerpo de la petición inválido o campos obligatorios no enviados.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Token de autenticación no suministrado o inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "El usuario o la categoría de gasto referenciados no existen.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "422": {
            description: "Violación de regla de negocio: el monto del gasto debe ser estrictamente mayor a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor durante la persistencia del registro.",
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
    CrearGastoDto: {
      type: "object",
      description: "Datos requeridos para el alta de un nuevo gasto financiero.",
      required: ["userId", "categoryId", "amount"],
      properties: {
        userId: {
          type: "integer",
          minimum: 1,
          description: "ID del usuario propietario al que se imputa el gasto.",
          example: 1,
        },
        categoryId: {
          type: "integer",
          minimum: 1,
          description: "ID de la categoría asignada al gasto (e.g. alimentación, transporte, ocio).",
          example: 1,
        },
        amount: {
          type: "number",
          format: "float",
          minimum: 0.01,
          description: "Monto monetario debitado en la transacción (debe ser estrictamente mayor a 0).",
          example: 350.75,
        },
      },
    },
    ActualizarGastoDto: {
      type: "object",
      description: "Campos admitidos para actualización parcial de un gasto existente.",
      properties: {
        categoryId: {
          type: "integer",
          minimum: 1,
          description: "Nuevo ID de la categoría a la cual se reasigna el gasto.",
          example: 2,
        },
        amount: {
          type: "number",
          format: "float",
          minimum: 0.01,
          description: "Nuevo importe monetario del gasto (estrictamente mayor a 0).",
          example: 420.0,
        },
      },
    },
    GastoEntity: {
      type: "object",
      description: "Entidad completa de gasto tal como se almacena en la base de datos.",
      required: ["id", "userId", "categoryId", "amount", "date"],
      properties: {
        id: {
          type: "integer",
          description: "Identificador numérico secuencial del registro de gasto.",
          example: 1,
        },
        userId: {
          type: "integer",
          description: "Identificador del usuario propietario.",
          example: 1,
        },
        categoryId: {
          type: "integer",
          description: "Identificador de la categoría vinculada.",
          example: 1,
        },
        amount: {
          type: "number",
          format: "float",
          description: "Importe del gasto debitado.",
          example: 350.75,
        },
        date: {
          type: "string",
          format: "date-time",
          description: "Marca temporal en formato ISO-8601 del momento en que se registró el gasto.",
          example: "2026-10-08T04:20:00.000Z",
        },
      },
    },
    ListarGastosResponse: {
      type: "object",
      description: "Respuesta con la colección de gastos asociados al usuario.",
      required: ["registros"],
      properties: {
        registros: {
          type: "array",
          description: "Arreglo con todos los registros de gastos pertenecientes al usuario.",
          items: {
            $ref: "#/components/schemas/GastoEntity",
          },
        },
      },
    },
    CrearGastoResponse: {
      type: "object",
      description: "Respuesta satisfactoria tras la creación exitosa del gasto.",
      required: ["nuevoGasto"],
      properties: {
        nuevoGasto: {
          $ref: "#/components/schemas/GastoEntity",
        },
      },
    },
    ActualizarGastoResponse: {
      type: "object",
      description: "Respuesta satisfactoria con el registro de gasto debidamente actualizado.",
      required: ["registroActualizado"],
      properties: {
        registroActualizado: {
          $ref: "#/components/schemas/GastoEntity",
        },
      },
    },
    EliminarGastoResponse: {
      type: "object",
      description: "Respuesta tras la eliminación exitosa del registro de gasto.",
      required: ["registroEliminado"],
      properties: {
        registroEliminado: {
          $ref: "#/components/schemas/GastoEntity",
        },
      },
    },
  },
};
