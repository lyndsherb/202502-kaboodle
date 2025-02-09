export type Status = {
  status: number;
};

export type BaseError = Status & {
  // eslint-disable-next-line
  error: any;
  message: string;
};

export type KbdEvent = {
  id: string;
  name: string;
  date: string; // @todo turn into Date?
  description: string;
};

export type KbdTicket = {
  id: string;
  name: string;
  type: string;
  price: number;
  booking_fee: number;
  ticket_qty: number;
};

export type KbdEventTicket = {
  event_id: string;
  ticket_id: string;
  ticket_qty: number;
};

export type NewEvent = Omit<KbdEvent, 'id'> & {
  id?: string;
};

export type NewTicket = Omit<KbdTicket, 'id'> & {
  id?: string;
};

export type KbdFullEventData = KbdEvent & {
  tickets: KbdTicket[];
};

export type UpdateEvent = KbdEvent & {
  tickets: KbdTicket[] & { ticket_qty: number };
};

export type CreateEventType = Status & {
  data: KbdFullEventData;
};

export type GetDataType = Status & {
  events: KbdEvent[];
  tickets: KbdTicket[];
  eventsTickets: KbdEventTicket[];
};
