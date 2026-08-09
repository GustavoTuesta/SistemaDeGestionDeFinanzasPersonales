import { Router } from 'express';
import { registrarGastoController } from './controllers/crear-gasto-controller'
import { eliminarRegistroGastoController } from './controllers/eliminar-gasto-controller';
import { actualizarGastoController } from './controllers/actualizar-gasto-controller';

const router = Router();

router.post(
    '/gasto', 
    registrarGastoController
);

router.delete(
    '/gasto/:id',
    eliminarRegistroGastoController
)

router.patch(
    '/gasto/:id',
    actualizarGastoController
)
export default router;