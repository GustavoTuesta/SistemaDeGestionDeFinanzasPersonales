import { Router } from "express";
import { registrarIngresoController } from "./controllers/crear-registro-controller"
import { eliminarRegistroIngresoController } from "./controllers/eliminar-registro-controller";

const router = Router();

router.post(
    '/registro-ingreso',
    registrarIngresoController
)

router.delete(
    '/ingreso/:id',
    eliminarRegistroIngresoController
)

export default router;