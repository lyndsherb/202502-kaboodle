import express, { Request, Response } from 'express';
import { dataEvents } from './utils/index.js';
const router = express.Router();

router.get('/events', (req: Request, res: Response) => {
  res.send(dataEvents);
});

router.get('/events/:id', (req: Request, res: Response) => {
  const eventId = req.params.id;

  if (dataEvents[eventId as any]) {
    res.send(dataEvents[eventId as any]);
  } else {
    res.send(`Could not find event with ${eventId}`);
  }
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
