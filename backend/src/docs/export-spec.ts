import fs from "fs";
import path from "path";
import { openApiDocument } from "./openapi";

const outputPath = path.resolve(__dirname, "../../openapi.json");
fs.writeFileSync(outputPath, JSON.stringify(openApiDocument, null, 2), "utf-8");

console.log(`Especificación OpenAPI generada exitosamente en: ${outputPath}`);
