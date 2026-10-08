export const gastosDocs = {
  tag: {
    name: "Gastos",
    description: "Operaciones para la gestión y seguimiento de gastos financieros del usuario.",
  },
  paths: {
    "/api/gasto/{id}": {
      get: {
        tags: ["Gastos"],
        summary: "Listar gastos por usuario",
        description: "Devuelve todos los gastos registrados asociados al ID del usuario.",
        operationId: "listarGastosPorUsuario",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del usuario cuyos gastos se desean listar",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de gastos obtenida con éxito.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListarGastosResponse",
                },
              },
            },
          },
          "400": {
            description: "El parámetro id debe ser un número entero mayor a 0.",
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
        tags: ["Gastos"],
        summary: "Actualizar gasto",
        description: "Actualiza el monto y/o la categoría de un gasto existente especificado por su ID.",
        operationId: "actualizarGasto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del registro de gasto a actualizar",
            schema: {
              type: "integer",
              example: 3,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ActualizarGastoDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Gasto actualizado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ActualizarGastoResponse",
                },
              },
            },
          },
          "400": {
            description: "Error de validación en parámetros numéricos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Registro de gasto no encontrado.",
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
        tags: ["Gastos"],
        summary: "Eliminar gasto",
        description: "Elimina de la base de datos el gasto indicado por su ID.",
        operationId: "eliminarGasto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del registro de gasto a eliminar",
            schema: {
              type: "integer",
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
            description: "El parámetro id debe ser un número mayor a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Gasto no encontrado.",
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
    "/api/gasto": {
      post: {
        tags: ["Gastos"],
        summary: "Registrar gasto",
        description: "Registra un nuevo gasto financiero vinculado al usuario y a su correspondiente categoría de gasto.",
        operationId: "crearGasto",
        requestBody: {
          required: true,
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
            description: "Datos numéricos inválidos o menores/iguales a 0.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Usuario o categoría de gasto no encontrados.",
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
    CrearGastoDto: {
      type: "object",
      required: ["userId", "categoryId", "amount"],
      properties: {
        userId: {
          type: "integer",
          description: "ID del usuario propietario del gasto",
          example: 1,
        },
        categoryId: {
          type: "integer",
          description: "ID de la categoría del gasto",
          example: 1,
        },
        amount: {
          type: "number",
          format: "float",
          description: "Monto del gasto (mayor a 0)",
          example: 350.75,
        },
      },
    },
    ActualizarGastoDto: {
      type: "object",
      properties: {
        categoryId: {
          type: "integer",
          description: "Nuevo ID de categoría de gasto",
          example: 2,
        },
        amount: {
          type: "number",
          format: "float",
          description: "Nuevo monto del gasto (mayor a 0)",
          example: 420.0,
        },
      },
    },
    GastoEntity: {
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
          example: 1,
        },
        amount: {
          type: "number",
          example: 350.75,
        },
        date: {
          type: "string",
          format: "date-time",
          example: "2026-10-08T04:20:00.000Z",
        },
      },
    },
    ListarGastosResponse: {
      type: "object",
      properties: {
        registros: {
          type: "array",
          items: {
            $ref: "#/components/schemas/GastoEntity",
          },
        },
      },
    },
    CrearGastoResponse: {
      type: "object",
      properties: {
        nuevoGasto: {
          $ref: "#/components/schemas/GastoEntity",
        },
      },
    },
    ActualizarGastoResponse: {
      type: "object",
      properties: {
        registroActualizado: {
          $ref: "#/components/schemas/GastoEntity",
        },
      },
    },
    EliminarGastoResponse: {
      type: "object",
      properties: {
        registroEliminado: {
          $ref: "#/components/schemas/GastoEntity",
        },
      },
    },
  },
};
