import fs from 'fs';
import { BaseError, KbdEvent, KbdEventTicket, KbdTicket } from '../types.js';

export const setEventData = (
  events: KbdEvent[]
):
  | {
      status: 200;
    }
  | BaseError => {
  try {
    fs.writeFileSync('./data/events.json', JSON.stringify(events), 'utf-8');

    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 500,
      error,
      message: 'Failed to write to Events JSON file',
    };
  }
};

export const setTicketData = (tickets: Omit<KbdTicket, 'ticket_qty'>[]) => {
  try {
    fs.writeFileSync('./data/tickets.json', JSON.stringify(tickets), 'utf-8');

    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 500,
      error,
      message: 'Failed to write to Tickets JSON file',
    };
  }
};

export const setEventsTicketsData = (eventsTickets: KbdEventTicket[]) => {
  try {
    fs.writeFileSync(
      './data/eventstickets.json',
      JSON.stringify(eventsTickets),
      'utf-8'
    );

    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 500,
      error,
      message: 'Failed to write to EventsTickets JSON file',
    };
  }
};
