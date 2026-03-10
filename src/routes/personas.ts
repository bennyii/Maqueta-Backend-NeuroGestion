import { Router } from "express";
import { getPersonas } from "../controllers/personas";
import { getPersonasByRol } from "../controllers/personas";
import express from 'express';
import { isAdmin } from "../middlewares/auth.middleware";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/personas', getPersonas);
router.get('/personas_rol', requireAuth, isAdmin,getPersonasByRol);

export default router;