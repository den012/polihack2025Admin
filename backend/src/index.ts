import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});