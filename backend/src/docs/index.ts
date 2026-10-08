import { Router } from "express";
import { apiReference } from "@scalar/express-api-reference";
import { openApiDocument } from "./openapi";

const router = Router();

// Endpoint para obtener la especificación OpenAPI en formato JSON
router.get("/docs/openapi.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(openApiDocument);
});

// Interfaz interactiva de documentación generada con Scalar
router.use(
  "/docs",
  apiReference({
    pageTitle: "Sistema de Finanzas Personales - Scalar API Reference",
    theme: "purple",
    spec: {
      content: openApiDocument,
    },
  })
);

export { openApiDocument };
export default router;
