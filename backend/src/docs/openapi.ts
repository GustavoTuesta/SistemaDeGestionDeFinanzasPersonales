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
    description: `
API RESTful empresarial para la administración, registro y control de finanzas personales.

### Módulos Principales:
- **Autenticación**: Registro de nuevos usuarios y emisión de tokens JWT mediante bcrypt y firmado criptográfico.
- **Ingresos**: Control y clasificación de entradas monetarias del usuario por categoría.
- **Gastos**: Seguimiento de débitos y consumos categorizados con validación de integridad referencial.
- **Préstamos**: Registro y control de pasivos, compromisos crediticios y acreedores.

### Estándar de Especificación:
- Especificación construida bajo el estándar **OpenAPI 3.1.0** y visualizada con **Scalar API Reference**.
- Cobertura exhaustiva de códigos de estado HTTP (\`200\`, \`201\`, \`400\`, \`401\`, \`404\`, \`409\`, \`422\`, \`500\`).
- Esquemas fuertemente tipados con restricciones de rango y validaciones de campo.
    `.trim(),
    contact: {
      name: "Equipo de Arquitectura y Desarrollo",
      email: "soporte@finanzas-personales.local",
    },
    license: {
      name: "ISC",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Servidor de Desarrollo Local (Puerto 5000)",
    },
    {
      url: "http://localhost:3000",
      description: "Servidor de Desarrollo Local (Puerto 3000)",
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
