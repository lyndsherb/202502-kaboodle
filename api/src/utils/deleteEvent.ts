import { Request, Response } from 'express';
import { getData } from './getData.js';
import { Status, BaseError, KbdFullEventData, GetDataType } from '../types.js';
import { setEventData, setEventsTicketsData } from './setData.js';

const kbdDelete = (eventId: string): Status | BaseError => {
  if (!eventId) {
    return {
      status: 400,
      error: null,
      message: 'No eventId passed to delete function.',
    };
  }

  const data = getData();

  if (data.status !== 200) {
    return data as BaseError;
  }

  const { events, eventsTickets } = data as GetDataType;

  if (!events.find(({ id }) => id === eventId)) {
    return {
      status: 404,
      error: null,
      message: `Could not find event with ID ${eventId} to delete; have you deleted this event already?`,
    };
  }

  const eventsOut = events.filter(({ id }) => id !== eventId);

  const eventsTicketsOut = eventsTickets.filter(
    ({ event_id }) => event_id !== eventId
  );

  const setEvent = setEventData(eventsOut);

  if (setEvent.status !== 200) {
    return setEvent;
  }

  const setEventsTickets = setEventsTicketsData(eventsTicketsOut);

  if (setEventsTickets.status !== 200) {
    return setEventsTickets;
  }

  return {
    status: 200,
  };
};

export const deleteEvent = (req: Request, res: Response) => {
  res.send(kbdDelete(req.params.id));
};
