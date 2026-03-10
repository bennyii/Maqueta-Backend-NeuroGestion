import { Router } from 'express';
import personasRoutes from './personas';
import cursosRoutes from './cursos';
import webhookRoutes from './webhook';

const router = Router();

router.use('/', personasRoutes);
router.use('/', cursosRoutes);
router.use('/', webhookRoutes);// llamo al router de webhook

export default router;