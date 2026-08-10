import { Router } from "express";
import { prestamoController } from './controllers/crear-prestamo-controller'
import { eliminarRegistroPrestamoController } from "./controllers/eliminar-prestamo-controller";
import { actualizarPrestamoController } from "./controllers/actualizar-prestamo-controller";
import { listarPrestamoController } from "./controllers/listar-prestamo-controller";

const router = Router();

router.get(
    '/prestamo/:id',
    listarPrestamoController
)

router.post(
    '/prestamo',
    prestamoController
)

router.delete(
    '/prestamo/:id',
    eliminarRegistroPrestamoController
)

router.patch(
    '/prestamo/:id',
    actualizarPrestamoController
)
export default router;