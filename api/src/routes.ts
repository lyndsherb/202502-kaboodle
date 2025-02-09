import express from 'express';
import { createEvent, getEvents } from './utils/index.js';
import { getSingleEvent } from './utils/getSingleEvent.js';
import { deleteEvent } from './utils/deleteEvent.js';

const router = express.Router();

router.get('/events', getEvents);

router.get('/events/:id', getSingleEvent);

router.post('/events', createEvent);

router.put('/events/:id');

router.delete('/events/:id', deleteEvent);

export default router;
