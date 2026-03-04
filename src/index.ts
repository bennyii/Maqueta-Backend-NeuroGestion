import 'dotenv/config';
import express from 'express';
import mainRouter from './routes/mainRouter' 

const app = express();
app.use(express.json());

// Usamos el mainRouter para manejar todas las rutas, para que este mas limpio el index
app.use(mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SERVIDOR LISTO EN EL PUERTO ${PORT}`);
});