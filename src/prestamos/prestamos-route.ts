import { Router } from "express";
import { prestamoController } from './prestamo-controller'

const router = Router()

router.post(
    '/prestamo',
    prestamoController
)

export default router;