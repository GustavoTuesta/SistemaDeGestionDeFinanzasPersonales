import { Router } from "express";
import { registrarIngresoController } from "./controllers/crear-ingreso-controller"
import { eliminarRegistroIngresoController } from "./controllers/eliminar-ingreso-controller";

const router = Router();

router.post(
    '/ingreso',
    registrarIngresoController
)

router.delete(
    '/ingreso/:id',
    eliminarRegistroIngresoController
)

export default router;