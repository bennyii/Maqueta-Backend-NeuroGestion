import 'dotenv/config';
import express from 'express';
import mainRouter from './routes/mainRouter' 


const app = express();
app.use(express.json());

app.use(mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SERVIDOR LISTO EN EL PUERTO ${PORT}`);
});