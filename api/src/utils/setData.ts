import fs from 'fs';
import {
  BaseError,
  KbdEvent,
  KbdEventTicket,
  KbdTicket,
  Status,
} from '../types.js';

export const setEventData = (events: KbdEvent[]): Status | BaseError => {
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

export const setTicketData = (
  tickets: Omit<KbdTicket, 'ticket_qty'>[]
): Status | BaseError => {
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

export const setEventsTicketsData = (
  eventsTickets: KbdEventTicket[]
): Status | BaseError => {
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
      message: 'Failed to write to Events JSON file',
    };
  }
};
