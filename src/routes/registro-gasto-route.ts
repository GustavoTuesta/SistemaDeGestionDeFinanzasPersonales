import { Router } from 'express';
import { registrarGastoController } from '../controllers/gastos/registro-gastos-controller'

const router = Router();

router.post(
    '/registro-gasto', 
    registrarGastoController
)