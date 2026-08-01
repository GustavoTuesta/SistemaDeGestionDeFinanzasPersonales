import { Router } from "express";
import { prestamoController } from './prestamos-controller'

const router = Router()

router.post(
    '/prestamo',
    prestamoController
)

export default router;