import { Router } from "express";
import { getCursos, getCursoByCategoria, createCurso, updateCurso, deleteCurso,
    addModuloToCurso, getModulos, updateModulo, deleteModuloFromCurso
} from "../controllers/cursos";
import express from 'express';
import { isAdmin } from "../middlewares/auth.middleware";
import { requireAuth } from "../middlewares/auth.middleware";


const router = express.Router();

router.get('/cursos', getCursos);
router.get('/categoria/:id_curso', getCursoByCategoria)
router.post('/cursos', requireAuth, isAdmin, createCurso);
router.put('/cursos/:id_curso', requireAuth, isAdmin, updateCurso);
router.delete('/cursos/:id_curso', requireAuth, isAdmin, deleteCurso);

router.get('/cursos/:id_curso/modulos', requireAuth, isAdmin, getModulos);
router.post('/cursos/:id_curso/modulos', requireAuth, isAdmin, addModuloToCurso);
router.put('/modulos/:id_modulo', requireAuth, isAdmin, updateModulo);
router.delete('/modulos/:id_modulo', requireAuth, isAdmin, deleteModuloFromCurso);

export default router;