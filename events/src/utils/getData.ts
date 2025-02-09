import { KbdEvent, KbdFullEventData } from '../types';

export const getEvents = async (): Promise<KbdEvent[]> => {
  const data = await fetch('http://localhost:3001/events');
  const events = await data.json();

  return events;
};

export const getSingleEvent = async (
  eventId: string
): Promise<KbdFullEventData> => {
  const data = await fetch(`http://localhost:3001/events/${eventId}`);
  const event = await data.json();

  return event;
};
