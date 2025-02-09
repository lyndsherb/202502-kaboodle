import express, { Request, Response } from 'express';
import mysql from 'mysql2';
const router = express.Router();

const connection = mysql.createConnection({
  host: 'kaboodle_db',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'kaboodle',
});

router.get('/events', (req: Request, res: Response) => {
  const query = 'SELECT * FROM events';

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500);
      res.send(error);
      return;
    }

    res.status(200);
    res.send(results);
  });
  // res.send('List of events');
});

router.get('/events/:id', (req: Request, res: Response) => {
  const eventId = req.params.id;
  res.send(`Details of event ${eventId}`);
});

router.post('/events', (req: Request, res: Response) => {
  res.send('Create a new event');
});

router.put('/events/:id', (req: Request, res: Response) => {
  const eventId = req.params.id;
  res.send(`Update event ${eventId}`);
});

router.delete('/events/:id', (req: Request, res: Response) => {
  const eventId = req.params.id;
  res.send(`Delete event ${eventId}`);
});

export default router;
