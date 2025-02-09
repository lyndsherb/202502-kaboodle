import { Request, Response } from 'express';
import fs from 'fs';
import { v4 } from 'uuid';
import * as data from '../data/index.js';
import {
  KbdEvent,
  KbdTicket,
  NewEvent,
  NewTicket,
  CreateEventType,
  BaseError,
} from '../types.js';

type CreateEventReturn = CreateEventType | BaseError;

const create = (
  event: NewEvent,
  tickets: NewTicket[] = []
): CreateEventReturn => {
  if (!event) {
    return {
      status: 400,
      error: null,
      message: 'No event data provided.',
    };
  }

  const newEvent: KbdEvent = {
    id: v4(),
    ...event,
  };

  const newTickets = tickets.map(
    (ticket: NewTicket): KbdTicket => ({
      id: v4(),
      ...ticket,
    })
  );

  const eventList = [...data.dataEvents, newEvent];

  const ticketsList = [
    ...data.dataTickets,
    ...newTickets.map(
      ({ ticket_qty, ...ticket }): Omit<KbdTicket, 'ticket_qty'> => ticket
    ),
  ];

  const eventsTicketsList = [
    ...data.dataEventsTickets,
    ...newTickets.map(({ id, ticket_qty }) => ({
      event_id: newEvent.id,
      ticket_id: id,
      ticket_qty,
    })),
  ];

  try {
    fs.writeFileSync('./data/events.json', JSON.stringify(eventList), 'utf-8');
    fs.writeFileSync(
      './data/tickets.json',
      JSON.stringify(ticketsList),
      'utf-8'
    );
    fs.writeFileSync(
      './data/eventstickets.json',
      JSON.stringify(eventsTicketsList),
      'utf-8'
    );

    return {
      status: 200,
      data: { ...newEvent, tickets: newTickets },
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
      message: 'Failed to update JSON files',
    };
  }
};

export const createEvent = (
  req: Request<NewEvent, NewTicket[]>,
  res: Response
) => {
  const output = create(req.body.event, req.body.tickets);
  res.send(output);
};
