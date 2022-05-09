import express from 'express';

import { errorHandling } from './middlewares/error-handling';

import { routes } from './routes';

import cors from 'cors'

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errorHandling);

app.listen(process.env.PORT || 3333, () => {
  console.log("HTTP server running");
})
