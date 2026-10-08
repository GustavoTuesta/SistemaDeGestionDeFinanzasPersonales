export const prestamosDocs = {
  tag: {
    name: "Préstamos",
    description: "Operaciones para la administración y control de préstamos adquiridos u otorgados.",
  },
  paths: {
    "/api/prestamo/{id}": {
      get: {
        tags: ["Préstamos"],
        summary: "Listar préstamos por usuario",
        description: "Devuelve todos los préstamos vinculados al ID del usuario consultado.",
        operationId: "listarPrestamosPorUsuario",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del usuario cuyos préstamos se desean consultar",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de préstamos obtenida con éxito.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListarPrestamosResponse",
                },
              },
            },
          },
          "400": {
            description: "El ID no es un número válido mayor a 0.",
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
        tags: ["Préstamos"],
        summary: "Actualizar préstamo",
        description: "Actualiza el nombre y/o monto de un préstamo registrado previamente.",
        operationId: "actualizarPrestamo",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del registro de préstamo a actualizar",
            schema: {
              type: "integer",
              example: 2,
            },
          },
        ],
        requestBody: {
          required: true,
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
            description: "Error de validación (nombre vacío o monto menor/igual a 0).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Registro de préstamo no encontrado.",
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
        tags: ["Préstamos"],
        summary: "Eliminar préstamo",
        description: "Elimina permanentemente el registro del préstamo por su ID.",
        operationId: "eliminarPrestamo",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del préstamo a eliminar",
            schema: {
              type: "integer",
              example: 2,
            },
          },
        ],
        responses: {
          "200": {
            description: "Préstamo eliminado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EliminarPrestamoResponse",
                },
              },
            },
          },
          "400": {
            description: "El ID proporcionado no es válido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BadRequestResponse",
                },
              },
            },
          },
          "404": {
            description: "Préstamo no encontrado.",
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
    "/api/prestamo": {
      post: {
        tags: ["Préstamos"],
        summary: "Registrar préstamo",
        description: "Crea un nuevo registro de préstamo asociado a un usuario.",
        operationId: "crearPrestamo",
        requestBody: {
          required: true,
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
            description: "Préstamo registrado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CrearPrestamoResponse",
                },
              },
            },
          },
          "400": {
            description: "Nombre de préstamo vacío o montos numéricos inválidos.",
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
    },
  },
  schemas: {
    CrearPrestamoDto: {
      type: "object",
      required: ["userId", "nombrePrestamo", "amount"],
      properties: {
        userId: {
          type: "integer",
          description: "ID del usuario propietario del préstamo",
          example: 1,
        },
        nombrePrestamo: {
          type: "string",
          description: "Nombre o descripción del préstamo",
          example: "Préstamo Personal Banco Galicia",
        },
        amount: {
          type: "number",
          format: "float",
          description: "Monto del préstamo (mayor a 0)",
          example: 50000.0,
        },
      },
    },
    ActualizarPrestamoDto: {
      type: "object",
      properties: {
        nombrePrestamo: {
          type: "string",
          description: "Nuevo nombre o descripción del préstamo",
          example: "Préstamo Automotor",
        },
        amount: {
          type: "number",
          format: "float",
          description: "Nuevo monto actualizado del préstamo",
          example: 45000.0,
        },
      },
    },
    PrestamoEntity: {
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
        nombrePrestamo: {
          type: "string",
          example: "Préstamo Personal Banco Galicia",
        },
        amount: {
          type: "number",
          example: 50000.0,
        },
        date: {
          type: "string",
          format: "date-time",
          example: "2026-10-08T04:25:00.000Z",
        },
      },
    },
    ListarPrestamosResponse: {
      type: "object",
      properties: {
        registros: {
          type: "array",
          items: {
            $ref: "#/components/schemas/PrestamoEntity",
          },
        },
      },
    },
    CrearPrestamoResponse: {
      type: "object",
      properties: {
        registrarPrestamo: {
          $ref: "#/components/schemas/PrestamoEntity",
        },
      },
    },
    ActualizarPrestamoResponse: {
      type: "object",
      properties: {
        registroActualizado: {
          $ref: "#/components/schemas/PrestamoEntity",
        },
      },
    },
    EliminarPrestamoResponse: {
      type: "object",
      properties: {
        eliminarRegistro: {
          $ref: "#/components/schemas/PrestamoEntity",
        },
      },
    },
  },
};
