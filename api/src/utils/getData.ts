import fs from 'fs';
import { BaseError, GetDataType } from '../types.js';

export const getData = (): GetDataType | BaseError => {
  try {
    const events = JSON.parse(fs.readFileSync('./data/events.json', 'utf-8'));
    const tickets = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf-8'));
    const eventsTickets = JSON.parse(
      fs.readFileSync('./data/eventstickets.json', 'utf-8')
    );

    return {
      status: 200,
      events,
      tickets,
      eventsTickets,
    };
  } catch (error) {
    return {
      status: 500,
      error,
      message: 'Failed to read data from JSON',
    };
  }
};
