import { Request, Response } from 'express';
import fs from 'fs';
import {
  BaseError,
  KbdEvent,
  KbdEventTicket,
  KbdFullEventData,
  KbdTicket,
} from '../types.js';

const getSingle = (eventId: string): KbdFullEventData | BaseError => {
  try {
    const dataEvents = JSON.parse(
      fs.readFileSync('./data/events.json', 'utf-8')
    );
    const dataTickets = JSON.parse(
      fs.readFileSync('./data/tickets.json', 'utf-8')
    );
    const dataEventsTickets = JSON.parse(
      fs.readFileSync('./data/eventstickets.json', 'utf-8')
    );

    const event = dataEvents.find(({ id }: KbdEvent) => id === eventId);
    const eventTicketsQtys = dataEventsTickets.filter(
      ({ event_id }: KbdEventTicket) => event_id === eventId
    );
    const tickets = dataTickets.reduce(
      (acc: KbdTicket[], ticket: KbdTicket) => {
        const qty = eventTicketsQtys.find(
          ({ ticket_id }: KbdEventTicket) => ticket_id === ticket.id
        )?.qty;

        if (!qty) {
          return acc;
        }

        return [
          ...acc,
          {
            ...ticket,
            ticket_qty: qty,
          },
        ];
      },
      []
    );

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
  } catch (error) {
    return {
      status: 500,
      error,
      message: `Failed to fetch event with ID ${eventId}`,
    };
  }
};

export const getSingleEvent = (
  req: Request,
  res: Response<KbdEvent | BaseError>
) => {
  res.send(getSingle(req.params.id));
};
