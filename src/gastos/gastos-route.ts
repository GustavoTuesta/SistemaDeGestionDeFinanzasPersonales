import { Router } from 'express';
import { registrarGastoController } from './gastos-controller'

const router = Router();

router.post(
    '/registro-gasto', 
    registrarGastoController
)

export default router;