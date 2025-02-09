export type BaseError = {
  status: number;
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
};

export type KbdEventTicket = {
  event_id: string;
  ticket_id: string;
  ticket_qty: number;
};

export type NewEvent = Omit<KbdEvent, 'id'>;

export type NewTicket = Omit<KbdTicket, 'id'> & {
  ticket_qty: number;
};

export type KbdFullEventData = KbdEvent & {
  tickets: KbdTicket[] & { ticket_qty: number };
};

export type UpdateEvent = KbdEvent & {
  tickets: KbdTicket[] & { ticket_qty: number };
};

export type CreateEventType = {
  status: number;
  data: KbdFullEventData;
};
