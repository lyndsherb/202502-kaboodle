import express, { Response } from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const port = 3001;
const options: cors.CorsOptions = {
  credentials: true,
  origin: true,
};

app.use(express.json());
app.use(cors(options));
app.use(routes);

app.get('/', (_, res: Response) => {
  res.send('Welcome to the Kaboodle API!');
});

app.listen(port, () => {
  console.log(`Kaboodle events API listening on port ${port}`);
});
