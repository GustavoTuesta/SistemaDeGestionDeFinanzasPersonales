export const ingresosDocs = {
  tag: {
    name: "Ingresos",
    description: "Operaciones para la administración, registro, consulta y control de ingresos monetarios del usuario.",
  },
  paths: {
    "/api/ingreso/{id}": {
      get: {
        tags: ["Ingresos"],
        summary: "Listar ingresos por usuario",
        description: `
Recupera el listado completo de ingresos monetarios registrados pertenecientes al ID de un usuario en particular.

### Comportamiento del Endpoint:
- **Consulta Relacional**: Retorna cada entrada de ingreso vinculada a su categoría, fecha de abono y monto correspondiente.
- **Idempotencia**: Consulta de solo lectura estrictamente idempotente. No muta ningún registro.

### Seguridad:
- Requiere autenticación Bearer JWT.
        `.trim(),
        operationId: "listarIngresosPorUsuario",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del usuario cuyos ingresos se desean consultar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Colección de ingresos del usuario recuperada con éxito.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListarIngresosResponse",
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
            description: "Token de autenticación faltante, expirado o con firma no válida.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "No se encontró ningún usuario con el ID especificado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno en el servidor o fallo de conectividad con la base de datos.",
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
        tags: ["Ingresos"],
        summary: "Actualizar ingreso existente",
        description: `
Modifica los datos registrados de monto y/o categoría de un ingreso existente especificado por su ID.

### Comportamiento del Endpoint:
- **Actualización Parcial**: Permite actualizar el monto (\`amount\`), la categoría (\`categoryId\`), o ambos campos simultáneamente.
- **Validación**: Verifica que la nueva categoría de ingreso referenciada exista en la base de datos.

### Efectos Secundarios:
- Modifica el registro en PostgreSQL y recalcula el acumulado total de ingresos del usuario.
        `.trim(),
        operationId: "actualizarIngreso",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del registro de ingreso a actualizar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 5,
            },
          },
        ],
        requestBody: {
          required: true,
          description: "Campos modificables del ingreso. Debe enviarse al menos un campo válido.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ActualizarIngresoDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Ingreso actualizado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ActualizarIngresoResponse",
                },
              },
            },
          },
          "201": {
            description: "Ingreso actualizado exitosamente (código retornado por controladores legacy).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ActualizarIngresoResponse",
                },
              },
            },
          },
          "400": {
            description: "Error de formato o tipos de datos numéricos incorrectos en la petición.",
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
            description: "Registro de ingreso no encontrado para el ID proporcionado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "422": {
            description: "El monto debe ser estrictamente positivo o la categoría indicada no existe.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor durante la modificación del registro.",
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
        tags: ["Ingresos"],
        summary: "Eliminar registro de ingreso",
        description: `
Elimina de forma permanente un registro de ingreso especificado por su ID.

### Comportamiento del Endpoint:
- **Persistencia**: Borra físicamente la fila correspondiente en la tabla de ingresos.
- **Idempotencia**: Devolverá 404 si el registro ya fue eliminado con anterioridad.

### Efectos Secundarios:
- Disminuye el acumulado total de ingresos del usuario en el cálculo del balance.
        `.trim(),
        operationId: "eliminarIngreso",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico único del registro de ingreso a eliminar.",
            schema: {
              type: "integer",
              minimum: 1,
              example: 5,
            },
          },
        ],
        responses: {
          "200": {
            description: "Ingreso eliminado satisfactoriamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EliminarIngresoResponse",
                },
              },
            },
          },
          "400": {
            description: "El parámetro id no es un número entero válido o es menor o igual a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "401": {
            description: "Credenciales de autorización no proporcionadas o inválidas.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnauthorizedResponse",
                },
              },
            },
          },
          "404": {
            description: "El registro de ingreso especificado no existe en el sistema.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor al intentar eliminar el registro.",
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
    "/api/ingreso": {
      post: {
        tags: ["Ingresos"],
        summary: "Registrar nuevo ingreso",
        description: `
Crea un nuevo registro de ingreso financiero para un usuario bajo una categoría específica.

### Comportamiento del Endpoint:
- **Validación Relacional**: Comprueba la existencia en la base de datos del usuario (\`userId\`) y de la categoría (\`categoryId\`).
- **Asignación Temporal**: Fija la fecha del registro en tiempo real en formato ISO-8601.

### Efectos Secundarios:
- Inserta una nueva fila en la tabla de ingresos y actualiza el capital positivo del usuario.
        `.trim(),
        operationId: "crearIngreso",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          description: "Datos requeridos para dar de alta el ingreso.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CrearIngresoDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Ingreso registrado satisfactoriamente en el sistema.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CrearIngresoResponse",
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
            description: "El usuario o la categoría de ingreso indicados no existen.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
          "422": {
            description: "El monto del ingreso debe ser un número estrictamente mayor a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UnprocessableEntityResponse",
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor durante la persistencia del ingreso.",
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
    CrearIngresoDto: {
      type: "object",
      description: "Datos obligatorios para registrar un nuevo ingreso económico.",
      required: ["userId", "categoryId", "amount"],
      properties: {
        userId: {
          type: "integer",
          minimum: 1,
          description: "ID del usuario propietario del ingreso registrado.",
          example: 1,
        },
        categoryId: {
          type: "integer",
          minimum: 1,
          description: "ID de la categoría de ingreso asignada (e.g. sueldo, inversiones, ventas).",
          example: 2,
        },
        amount: {
          type: "number",
          format: "float",
          minimum: 0.01,
          description: "Monto monetario del ingreso (debe ser estrictamente superior a 0).",
          example: 1500.5,
        },
      },
    },
    ActualizarIngresoDto: {
      type: "object",
      description: "Campos permitidos para la actualización parcial de un ingreso existente.",
      properties: {
        categoryId: {
          type: "integer",
          minimum: 1,
          description: "Nuevo ID de categoría para reclasificar el ingreso.",
          example: 3,
        },
        amount: {
          type: "number",
          format: "float",
          minimum: 0.01,
          description: "Nuevo valor monetario del ingreso (estrictamente superior a 0).",
          example: 1800.0,
        },
      },
    },
    IngresoEntity: {
      type: "object",
      description: "Entidad persistida que representa un registro de ingreso en el sistema.",
      required: ["id", "userId", "categoryId", "amount", "date"],
      properties: {
        id: {
          type: "integer",
          description: "Identificador numérico único del registro de ingreso.",
          example: 1,
        },
        userId: {
          type: "integer",
          description: "Identificador del usuario propietario del registro.",
          example: 1,
        },
        categoryId: {
          type: "integer",
          description: "Identificador de la categoría asociada.",
          example: 2,
        },
        amount: {
          type: "number",
          format: "float",
          description: "Monto acreditado en el ingreso.",
          example: 1500.5,
        },
        date: {
          type: "string",
          format: "date-time",
          description: "Marca temporal en formato ISO-8601 del registro de la transacción.",
          example: "2026-10-08T04:15:00.000Z",
        },
      },
    },
    ListarIngresosResponse: {
      type: "object",
      description: "Respuesta estructurada con el listado de ingresos del usuario.",
      required: ["registros"],
      properties: {
        registros: {
          type: "array",
          description: "Arreglo con todos los registros de ingreso pertenecientes al usuario.",
          items: {
            $ref: "#/components/schemas/IngresoEntity",
          },
        },
      },
    },
    CrearIngresoResponse: {
      type: "object",
      description: "Respuesta tras la creación exitosa del registro de ingreso.",
      required: ["registro"],
      properties: {
        registro: {
          $ref: "#/components/schemas/IngresoEntity",
        },
      },
    },
    ActualizarIngresoResponse: {
      type: "object",
      description: "Respuesta que contiene el registro de ingreso tras su actualización.",
      required: ["registroActualizado"],
      properties: {
        registroActualizado: {
          $ref: "#/components/schemas/IngresoEntity",
        },
      },
    },
    EliminarIngresoResponse: {
      type: "object",
      description: "Respuesta tras la eliminación exitosa del registro de ingreso.",
      required: ["registroEliminado"],
      properties: {
        registroEliminado: {
          $ref: "#/components/schemas/IngresoEntity",
        },
      },
    },
  },
};
