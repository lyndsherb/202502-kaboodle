import { Request, Response } from 'express';
import { CreateEventReturn } from './createEvent.js';
import {
  BaseError,
  GetDataType,
  KbdEvent,
  KbdEventTicket,
  KbdTicket,
  Status,
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
  event: KbdEvent
  // tickets: KbdTicket[]
): (Status & { data: KbdEvent }) | BaseError => {
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

  // Merge all ticket information to make sure we catch the new ones
  // const mergedTickets = [...dataTickets, ...tickets].reduce<KbdTicket[]>(
  //   (acc, ticket) => {
  //     if (acc.length > 0 && acc.find(({ id }) => ticket.id === id)) {
  //       return acc;
  //     }

  //     // if no ticket ID, then we must have a new ticket on our hands.
  //     // Create a new ticket and add to the list.
  //     if (!ticket.id) {
  //       return [...acc, { ...ticket, id: v4() }];
  //     }
  //     // ... then ensure we get the latest version of the ticket from the customer data,
  //     // but fall back to the existing ticket if we can't find the one from the submission
  //     const updatedTicket =
  //       tickets.find(({ id }) => ticket.id === id) || ticket;

  //     // return the list of tickets including our updates
  //     return [...acc, updatedTicket!];
  //   },
  //   []
  // );

  // const setTickets = setTicketData(
  //   mergedTickets.map(({ ticket_qty, ...ticket }) => ticket)
  // );

  // if (setTickets.status !== 200) {
  //   return setTickets as BaseError;
  // }

  // // create a list of new tickets to add to the list of EventsTickets
  // const newEventsTickets = mergedTickets
  //   .filter(
  //     ({ id }) => !eventsTickets.find(({ ticket_id }) => ticket_id === id)
  //   )
  //   .map(({ id, ticket_qty }) => ({
  //     event_id: eventId,
  //     ticket_id: id,
  //     ticket_qty,
  //   }));

  // const updatedEventsTickets = eventsTickets.reduce<KbdEventTicket[]>(
  //   (acc, eventticket) => {
  //     // if we don't have anything in the updated array OR the eventTicket we're looking at
  //     // doesn't match the current event, skip over it
  //     if (eventticket.event_id !== eventId) {
  //       return [...acc, eventticket];
  //     }

  //     // try finding the associated ticket; if not, skip over it
  //     const ticket = mergedTickets.find(
  //       ({ id }) => id === eventticket.ticket_id
  //     );

  //     if (!ticket) {
  //       return [...acc, eventticket];
  //     }

  //     return [
  //       ...acc,
  //       {
  //         ...eventticket,
  //         ticket_qty: ticket.ticket_qty,
  //       },
  //     ];
  //   },
  //   []
  // );

  // const finalisedEventsTickets = [...updatedEventsTickets, ...newEventsTickets];

  // const setEventsTickets = setEventsTicketsData(finalisedEventsTickets);

  // if (setEventsTickets.status !== 200) {
  //   return setEventsTickets as BaseError;
  // }

  const outputEvent = updatedEvents.find(({ id }) => eventId === id);
  // const outputTickets = updatedEventsTickets
  //   .filter(({ event_id }) => event_id)
  //   .map(({ ticket_id }) => mergedTickets.find(({ id }) => ticket_id === id));

  return {
    status: 200,
    // @ts-expect-error - this is unhappy about id potentially being undefined. It's unlikely at this point but it could happen.
    data: {
      ...outputEvent,
    },
  };
};

export const updateEvent = (req: Request, res: Response) => {
  res.send(update(req.params.id, req.body.event));
};
