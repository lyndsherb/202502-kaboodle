import { Request, Response } from 'express';
import { CreateEventReturn } from './createEvent.js';
import {
  BaseError,
  GetDataType,
  KbdEvent,
  KbdEventTicket,
  KbdTicket,
} from '../types.js';
import {
  setEventData,
  setEventsTicketsData,
  setTicketData,
} from './setData.js';
import { getData } from './getData.js';
import { v4 } from 'uuid';

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

      const id = ticket.id || v4();

      return {
        ...ticket,
        ...updatedTicket,
        id,
      };
    });

  const setTickets = setTicketData(
    updatedTickets.map(({ ticket_qty, ...ticket }) => ticket)
  );

  if (setTickets.status !== 200) {
    return setTickets as BaseError;
  }

  const newTickets = tickets.filter(
    ({ id }) => !eventsTickets.find(({ ticket_id }) => ticket_id === id)
  );

  const eventsTicketsList = eventsTickets.filter(
    ({ event_id }) => event_id === eventId
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

  const addedTickets = newTickets.map(
    ({ id, ticket_qty }: KbdTicket): KbdEventTicket => ({
      event_id: eventId,
      ticket_id: id,
      ticket_qty,
    })
  );

  const eventsTicketsData = [...updatedEventsTickets, ...addedTickets];

  const setEventsTickets = setEventsTicketsData(eventsTicketsData);

  if (setEventsTickets.status !== 200) {
    return setEventsTickets as BaseError;
  }

  const outputTickets = updatedTickets.filter(({ id }) =>
    eventsTicketsData.find(({ ticket_id }) => ticket_id === id)
  );

  const outputEvent = updatedEvents.find(({ id }) => eventId === id);

  return {
    status: 200,
    // @ts-expect-error
    data: {
      ...outputEvent,
      tickets: outputTickets,
    },
  };
};

export const updateEvent = (req: Request, res: Response) => {
  res.send(update(req.params.id, req.body.event, req.body.tickets || []));
};
