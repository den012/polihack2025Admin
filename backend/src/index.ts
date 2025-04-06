import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import formRoutes from './routes/formRoutes';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api', formRoutes);

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});