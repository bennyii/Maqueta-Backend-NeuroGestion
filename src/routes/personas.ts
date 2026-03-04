import { Router } from "express";
import { getPersonas } from "../controllers/personas";
import { getPersonasByRol } from "../controllers/personas";
import express from 'express';

const router = express.Router();

router.get('/personas', getPersonas);

router.get('/personas_rol', getPersonasByRol);

export default router;