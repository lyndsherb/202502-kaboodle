import { Request, Response } from 'express';
import { CreateEventReturn } from './createEvent.js';
import { BaseError, GetDataType, KbdEvent, KbdTicket } from '../types.js';
import {
  setEventData,
  setEventsTicketsData,
  setTicketData,
} from './setData.js';
import { getData } from './getData.js';

const update = (
  eventId: string,
  event: KbdEvent,
  tickets: KbdTicket[]
): CreateEventReturn => {
  if (!eventId || !event) {
    return {
      status: 400,
      error: null,
      message: 'No eventId or event data passed to updateEvent.',
    };
  }

  const data = getData();

  if (data.status !== 200) {
    return data as BaseError;
  }

  const { events, tickets: dataTickets, eventsTickets } = data as GetDataType;

  const updatedEvents = events.map((singleEvent) => {
    if (singleEvent.id !== eventId) {
      return singleEvent;
    }

    return {
      ...singleEvent,
      ...event,
    };
  });

  const setEvent = setEventData(updatedEvents);

  if (setEvent.status !== 200) {
    return setEvent as BaseError;
  }

  const updatedTickets = [...dataTickets, ...tickets]
    .reduce((acc: KbdTicket[], ticket: KbdTicket): KbdTicket[] => {
      if (acc.find(({ id }) => id === ticket.id)) {
        return acc;
      }

      return [...acc, ticket];
    }, [])
    .map((ticket: KbdTicket): KbdTicket => {
      const updatedTicket = tickets.find(({ id }) => id === ticket.id);

      if (!updatedTicket) {
        return ticket;
      }

      return {
        ...ticket,
        ...updatedTicket,
      };
    });

  const setTickets = setTicketData(
    updatedTickets.map(({ ticket_qty, ...ticket }) => ticket)
  );

  if (setTickets.status !== 200) {
    return setTickets as BaseError;
  }

  const eventsTicketsList = eventsTickets.filter(
    ({ event_id }) => event_id === eventId
  );

  const outputTickets = updatedTickets.filter(({ id }) =>
    eventsTickets.find(({ ticket_id }) => ticket_id === id)
  );

  const updatedEventsTickets = eventsTicketsList
    .filter(({ ticket_id }) => !tickets.find(({ id }) => ticket_id === id))
    .map((eventTicket) => {
      const updatedTicket = tickets.find(
        ({ id }) => eventTicket.ticket_id === id
      );

      if (!updatedTicket) {
        return eventTicket;
      }

      return {
        ...eventTicket,
        ticket_qty: updatedTicket.ticket_qty,
      };
    });

  const setEventsTickets = setEventsTicketsData(updatedEventsTickets);

  if (setEventsTickets.status !== 200) {
    return setEventsTickets as BaseError;
  }

  return {
    status: 200,
    data: { ...event, tickets: outputTickets },
  };
};

export const updateEvent = (req: Request, res: Response) => {
  res.send(update(req.params.id, req.body.event, req.body.tickets || []));
};
