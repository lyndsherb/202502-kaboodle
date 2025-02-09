import { Request, Response } from 'express';
import fs from 'fs';
import { v4 } from 'uuid';
import {
  KbdEvent,
  KbdTicket,
  NewEvent,
  NewTicket,
  CreateEventType,
  BaseError,
  GetDataType,
} from '../types.js';
import { getData } from './getData.js';
import {
  setEventData,
  setEventsTicketsData,
  setTicketData,
} from './setData.js';

export type CreateEventReturn = CreateEventType | BaseError;

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

  const data = getData();

  if (data.status !== 200) {
    return data as BaseError;
  }

  const { events, tickets: apiTickets, eventsTickets } = data as GetDataType;

  const newEvent: KbdEvent = {
    id: event.id || v4(),
    ...event,
  };

  const newTickets = tickets.map(
    (ticket: NewTicket): KbdTicket => ({
      id: ticket.id || v4(),
      ...ticket,
    })
  );

  const eventList = [...events, newEvent];

  const ticketsList = [
    ...apiTickets,
    ...newTickets.map(
      ({ ticket_qty, ...ticket }): Omit<KbdTicket, 'ticket_qty'> => ticket
    ),
  ];

  const eventsTicketsList = [
    ...eventsTickets,
    ...newTickets.map(({ id, ticket_qty }) => ({
      event_id: newEvent.id,
      ticket_id: id,
      ticket_qty,
    })),
  ];

  const eventOut = setEventData(eventList);

  if (eventOut.status !== 200) {
    return eventOut as BaseError;
  }

  const ticketOut = setTicketData(ticketsList);

  if (ticketOut.status !== 200) {
    return ticketOut as BaseError;
  }

  const eventsTicketsOut = setEventsTicketsData(eventsTicketsList);

  if (eventsTicketsOut.status !== 200) {
    return eventsTicketsOut as BaseError;
  }

  return {
    status: 200,
    data: { ...newEvent, tickets: newTickets },
  };
};

export const createEvent = (
  req: Request<NewEvent, NewTicket[]>,
  res: Response
) => {
  res.send(create(req.body.event, req.body.tickets));
};
