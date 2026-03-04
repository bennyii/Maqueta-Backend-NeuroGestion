import express from 'express';
import 'dotenv/config';
import cursosRoutes from './routes/cursosRoutes';

const app = express();

app.use(express.json());

app.use('/api/cursos', cursosRoutes)

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('ESTA VIVOO!');
});

app.listen(PORT, () => {
  console.log(`EL SERVER SE ALOJA EN EL PUERTO ${PORT}`);
});

