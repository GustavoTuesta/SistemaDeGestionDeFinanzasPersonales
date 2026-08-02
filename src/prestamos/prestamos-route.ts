import { Router } from "express";
import { prestamoController } from './prestamos-controller'

const router = Router()

router.post(
    '/registro-prestamo',
    prestamoController
)

export default router;