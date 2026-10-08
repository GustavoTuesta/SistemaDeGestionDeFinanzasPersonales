import { authDocs } from "./modules/auth.docs";
import { ingresosDocs } from "./modules/ingresos.docs";
import { gastosDocs } from "./modules/gastos.docs";
import { prestamosDocs } from "./modules/prestamos.docs";
import { commonSchemas, securitySchemes } from "./schemas/common.docs";

export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Sistema de Finanzas Personales API",
    version: "1.0.0",
    description: `API RESTful para la gestión y control de finanzas personales.
Permite registrar transacciones financieras organizadas en módulos de **Autenticación**, **Ingresos**, **Gastos** y **Préstamos**.

Documentada y renderizada con **Scalar API Reference**.`,
    contact: {
      name: "Equipo de Desarrollo",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Servidor de Desarrollo Local",
    },
  ],
  tags: [
    authDocs.tag,
    ingresosDocs.tag,
    gastosDocs.tag,
    prestamosDocs.tag,
  ],
  paths: {
    ...authDocs.paths,
    ...ingresosDocs.paths,
    ...gastosDocs.paths,
    ...prestamosDocs.paths,
  },
  components: {
    schemas: {
      ...commonSchemas,
      ...authDocs.schemas,
      ...ingresosDocs.schemas,
      ...gastosDocs.schemas,
      ...prestamosDocs.schemas,
    },
    securitySchemes,
  },
};
