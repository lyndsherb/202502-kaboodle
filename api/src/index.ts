import express, { Response } from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(routes);

app.get('/', (_, res: Response) => {
  res.send('Welcome to the Kaboodle API!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
