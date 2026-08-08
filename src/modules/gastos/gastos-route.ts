import { Router } from 'express';
import { registrarGastoController } from './controllers/crear-gasto-controller'
import { eliminarRegistroGastoController } from './controllers/eliminar-gasto-controller';

const router = Router();

router.post(
    '/gasto', 
    registrarGastoController
);

router.delete(
    '/gasto/:id',
    eliminarRegistroGastoController
)

export default router;