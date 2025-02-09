import express, { Request, Response } from 'express';
import fs from 'fs';
import { createEvent, getEvents } from './utils/index.js';
import { KbdEvent, NewEvent, NewTicket, BaseError } from './types.js';
import { getSingleEvent } from './utils/getSingleEvent.js';
const router = express.Router();

router.get('/events', getEvents);

router.get('/events/:id', getSingleEvent);

router.post('/events', createEvent);

router.put('/events/:id', (req: Request, res: Response) => {
  const eventId = req.params.id;
  res.send(`Update event ${eventId}`);
});

router.delete('/events/:id', (req: Request, res: Response) => {
  const eventId = req.params.id;
  res.send(`Delete event ${eventId}`);
});

export default router;
