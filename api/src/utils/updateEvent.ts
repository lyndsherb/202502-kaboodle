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

  const outputEvent = updatedEvents.find(({ id }) => eventId === id);

  return {
    status: 200,
    // @ts-expect-error - this is unhappy about id potentially being undefined. It's unlikely for this test but it could happen.
    data: {
      ...outputEvent,
    },
  };
};

export const updateEvent = (req: Request, res: Response) => {
  res.send(update(req.params.id, req.body.event));
};
