import { Router } from "express";
import { registrarIngresoController } from "./ingresos-controller"

const router = Router();

router.post(
    '/registro-ingreso',
    registrarIngresoController
)

export default router;