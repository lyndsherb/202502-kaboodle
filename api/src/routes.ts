import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/events', (req: Request, res: Response) => {
  res.send('List of events');
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
