import { Router } from "express";
import { prestamoController } from './controllers/crear-prestamo-controller'
import { eliminarRegistroPrestamoController } from "./controllers/eliminar-prestamo-controller";

const router = Router()

router.post(
    '/registro-prestamo',
    prestamoController
)

router.delete(
    '/prestamo/:id',
    eliminarRegistroPrestamoController
)

export default router;