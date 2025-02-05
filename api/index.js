import express from 'express';
import routes from './routes.js';

const app = express();
const port = 3000;

app.use(routes);

app.get('/', (_, res) => {
  res.send('yippie');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
