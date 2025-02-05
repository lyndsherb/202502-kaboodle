import express, { Response } from 'express';
import routes from './routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.get('/', (_, res: Response) => {
  res.send('dist AND typescript, aint we bougie');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
