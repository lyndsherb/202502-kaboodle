import express, { Request, Response } from 'express';
import fs from 'fs';
import { createEvent } from './utils/create.js';
import {
  KbdEvent,
  NewEvent,
  NewTicket,
  BaseError,
  CreateEventType,
} from './types.js';
const router = express.Router();

router.get('/events', (_, res: Response<KbdEvent[] | BaseError>) => {
  try {
    const dataEvents = fs.readFileSync('./data/events.json', 'utf-8');
    const output = JSON.parse(dataEvents);
    res.send(output);
  } catch (error) {
    res.send({
      status: 500,
      error,
      message: 'Failed to fetch event list',
    });
  }
});

router.get(
  '/events/:id',
  (req: Request, res: Response<KbdEvent | BaseError>) => {
    const eventId = req.params.id;

    try {
      const dataEvents = JSON.parse(
        fs.readFileSync('./data/events.json', 'utf-8')
      );
      const event = dataEvents.find(({ id }: { id: string }) => id === eventId);

      if (event) {
        res.send(event);
      } else {
        res.send({
          status: 404,
          error: null,
          message: `Event with ID ${eventId} does not exist`,
        });
      }
    } catch (error) {
      res.send({
        status: 500,
        error,
        message: `Failed to fetch event with ID ${eventId}`,
      });
    }
  }
);

router.post('/events', (req: Request<NewEvent, NewTicket[]>, res: Response) => {
  const output = createEvent(req.body.event, req.body.tickets);
  res.send(output);
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
