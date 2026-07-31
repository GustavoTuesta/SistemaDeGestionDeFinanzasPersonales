import { Router } from 'express';
import { registrarGastoController } from './registro-gastos-controller'

const router = Router();

router.post(
    '/registro-gasto', 
    registrarGastoController
)

export default router;