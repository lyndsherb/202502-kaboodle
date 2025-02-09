import { Request, Response } from 'express';
import {
  BaseError,
  GetDataType,
  KbdEvent,
  KbdEventTicket,
  KbdFullEventData,
  KbdTicket,
} from '../types.js';
import { getData } from './getData.js';

const getSingle = (eventId: string): KbdFullEventData | BaseError => {
  const data = getData();

  if (data.status !== 200) {
    return data as BaseError;
  }

  const { events, tickets: dataTickets, eventsTickets } = data as GetDataType;

  const event = events.find(({ id }: KbdEvent) => id === eventId);
  const eventTicketsQtys = eventsTickets.filter(
    ({ event_id }: KbdEventTicket) => event_id === eventId
  );

  const tickets = dataTickets.reduce((acc: KbdTicket[], ticket: KbdTicket) => {
    const ticketWithQty = eventTicketsQtys.find(
      ({ ticket_id }: KbdEventTicket) => ticket_id === ticket.id
    );

    if (!ticketWithQty) {
      return acc;
    }

    const { ticket_qty } = ticketWithQty;

    return [
      ...acc,
      {
        ...ticket,
        ticket_qty,
      },
    ];
  }, []);

  if (event) {
    return {
      ...event,
      tickets,
    };
  } else {
    return {
      status: 404,
      error: null,
      message: `Event with ID ${eventId} does not exist`,
    };
  }
};

export const getSingleEvent = (
  req: Request,
  res: Response<KbdEvent | BaseError>
) => {
  res.send(getSingle(req.params.id));
};
