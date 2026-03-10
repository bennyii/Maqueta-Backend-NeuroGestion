import { Router } from "express";
import { getPersonas } from "../controllers/personas";
import { getPersonasByRol } from "../controllers/personas";
import express from 'express';
import { isAdmin } from "../middlewares/auth.middleware";
import { requireAuth } from "../middlewares/auth.middleware";
import { get } from "node:http";
import { getProgresoByPersona } from "../controllers/progreso";

const router = express.Router();

router.get('/personas', getPersonas);
router.get('/personas_rol', requireAuth, isAdmin,getPersonasByRol);
router.get('/progreso_persona/:id', getProgresoByPersona);
//router.get('/progreso_persona/:id',  getProgresoByPersona);

export default router;