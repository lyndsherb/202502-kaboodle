import { KbdEvent, KbdFullEventData, Status } from '../types';
import { apiUrl } from './constants';

export const getEvents = async (): Promise<KbdEvent[]> => {
  const data = await fetch(`${apiUrl}/events`);
  const events = await data.json();

  return events;
};

export const getSingleEvent = async (
  eventId: string
): Promise<KbdFullEventData & Status> => {
  const data = await fetch(`${apiUrl}/events/${eventId}`);
  const event = await data.json();

  return event;
};
