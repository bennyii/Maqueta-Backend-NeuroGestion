import 'dotenv/config';
import express from 'express';
import cursosRoutes from './routes/cursos';

const app = express();

app.use(express.json());

app.use('/api/cursos', cursosRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`EL SERVER SE ALOJA EN EL PUERTO ${PORT}`);
});

