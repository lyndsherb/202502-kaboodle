import express from 'express';
import routes from './routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.get('/', (_, res) => {
  res.send('woohoo');
});

app.listen(port, () => {
  console.log('hi!');
  console.log(`Example app listening on port ${port}`);
});
