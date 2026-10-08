import fs from "fs";
import path from "path";
import { openApiDocument } from "./openapi";

const backendOutputPath = path.resolve(__dirname, "../../openapi.json");
const rootOutputPath = path.resolve(__dirname, "../../../openapi.json");
const jsonContent = JSON.stringify(openApiDocument, null, 2);

fs.writeFileSync(backendOutputPath, jsonContent, "utf-8");
console.log(`Especificación OpenAPI generada exitosamente en: ${backendOutputPath}`);

if (fs.existsSync(path.dirname(rootOutputPath))) {
  fs.writeFileSync(rootOutputPath, jsonContent, "utf-8");
  console.log(`Especificación OpenAPI sincronizada en la raíz: ${rootOutputPath}`);
}
