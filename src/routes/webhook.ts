import express from 'express';
import { verifyErpToken } from '../middlewares/auth.middleware';
import { Erp } from '../controllers/webhook';



const router = express.Router();


router.post('/webhook',verifyErpToken, Erp) // Ruta para recibir el webhook del ERP, llamo a la funcion de verificacion de token y luego al controller "erp", que hace toda la logica



export default router;