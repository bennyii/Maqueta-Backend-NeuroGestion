import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('ESTA VIVOO!');
});

app.listen(PORT, () => {
  console.log(`EL SERVER SE ALOJA EN EL PUERTO ${PORT}`);
});

