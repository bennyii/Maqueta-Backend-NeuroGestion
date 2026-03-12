import {Router} from 'express';
import {connectGoogle, googleCallback, createEvent} from '../controllers/google';
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get('/auth/google', requireAuth, connectGoogle);
router.get('/auth/google/callback', googleCallback);
router.post('/calendar/event', requireAuth, createEvent);

export default router;