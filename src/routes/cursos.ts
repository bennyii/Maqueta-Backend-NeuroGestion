import { Router } from "express";
import { getCursos } from "../controllers/cursos";
import express from 'express';


const router = express.Router();

router.get('/cursos', getCursos);



export default router;