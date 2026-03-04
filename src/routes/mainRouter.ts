import { Router } from 'express';
import personasRoutes from './personas';
import cursosRoutes from './cursos';

const router = Router();

router.use('/', personasRoutes);
router.use('/', cursosRoutes);

export default router;