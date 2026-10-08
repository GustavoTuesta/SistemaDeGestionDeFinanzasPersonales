export const ingresosDocs = {
  tag: {
    name: "Ingresos",
    description: "Operaciones para la gestión de ingresos financieros (crear, listar, actualizar y eliminar).",
  },
  paths: {
    "/api/ingreso/{id}": {
      get: {
        tags: ["Ingresos"],
        summary: "Listar ingresos por usuario",
        description: "Obtiene la lista completa de ingresos registrados que pertenecen a un usuario específico.",
        operationId: "listarIngresosPorUsuario",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del usuario cuyos ingresos se desean consultar",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de ingresos obtenida con éxito.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListarIngresosResponse",
                },
              },
            },
          },
          "400": {
            description: "El parámetro id no es válido o es menor/igual a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Usuario no encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Ingresos"],
        summary: "Actualizar ingreso",
        description: "Actualiza los campos de un registro de ingreso existente (categoría y/o monto).",
        operationId: "actualizarIngreso",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del registro de ingreso a actualizar",
            schema: {
              type: "integer",
              example: 5,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ActualizarIngresoDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Ingreso actualizado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ActualizarIngresoResponse",
                },
              },
            },
          },
          "400": {
            description: "Validación fallida para los campos numéricos (id, categoryId o amount).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Registro de ingreso no encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Ingresos"],
        summary: "Eliminar ingreso",
        description: "Elimina de forma permanente un registro de ingreso específico por su ID.",
        operationId: "eliminarIngreso",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del registro de ingreso a eliminar",
            schema: {
              type: "integer",
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
            description: "El ID proporcionado no es un número válido mayor a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "El ingreso no existe en la base de datos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
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
        summary: "Registrar ingreso",
        description: "Crea un nuevo registro de ingreso asociado a un usuario y a una categoría de ingreso existente.",
        operationId: "crearIngreso",
        requestBody: {
          required: true,
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
            description: "Ingreso registrado satisfactoriamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CrearIngresoResponse",
                },
              },
            },
          },
          "400": {
            description: "Datos numéricos inválidos en el cuerpo de la petición (userId, categoryId o amount).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Usuario o categoría de ingreso no encontrados.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse",
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
      required: ["userId", "categoryId", "amount"],
      properties: {
        userId: {
          type: "integer",
          description: "ID del usuario propietario del ingreso",
          example: 1,
        },
        categoryId: {
          type: "integer",
          description: "ID de la categoría de ingreso",
          example: 2,
        },
        amount: {
          type: "number",
          format: "float",
          description: "Monto del ingreso (debe ser mayor a 0)",
          example: 1500.5,
        },
      },
    },
    ActualizarIngresoDto: {
      type: "object",
      properties: {
        categoryId: {
          type: "integer",
          description: "Nuevo ID de categoría de ingreso",
          example: 3,
        },
        amount: {
          type: "number",
          format: "float",
          description: "Nuevo monto del ingreso (mayor a 0)",
          example: 1800.0,
        },
      },
    },
    IngresoEntity: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        userId: {
          type: "integer",
          example: 1,
        },
        categoryId: {
          type: "integer",
          example: 2,
        },
        amount: {
          type: "number",
          example: 1500.5,
        },
        date: {
          type: "string",
          format: "date-time",
          example: "2026-10-08T04:15:00.000Z",
        },
      },
    },
    ListarIngresosResponse: {
      type: "object",
      properties: {
        registros: {
          type: "array",
          items: {
            $ref: "#/components/schemas/IngresoEntity",
          },
        },
      },
    },
    CrearIngresoResponse: {
      type: "object",
      properties: {
        registro: {
          $ref: "#/components/schemas/IngresoEntity",
        },
      },
    },
    ActualizarIngresoResponse: {
      type: "object",
      properties: {
        registroActualizado: {
          $ref: "#/components/schemas/IngresoEntity",
        },
      },
    },
    EliminarIngresoResponse: {
      type: "object",
      properties: {
        registroEliminado: {
          $ref: "#/components/schemas/IngresoEntity",
        },
      },
    },
  },
};
