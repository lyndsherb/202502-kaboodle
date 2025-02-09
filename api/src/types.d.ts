export type KbdEvent = {
  id: number;
  name: string;
  date: Date;
  description: string;
};

export type KbdTicket = {
  id: number;
  name: string;
  type: string;
  price: number;
  booking_fee: number;
};

export type KbdEventTicket = {
  event_id: number;
  ticket_id: number;
  ticket_qty: number;
};

export type NewEvent = Omit<KbdEvent, 'id'> & {
  tickets: Omit<KbdTicket, 'id'>[] & { ticket_qty: number };
};

export type UpdateEvent = KbdEvent & {
  tickets: KbdTicket[] & { ticket_qty: number };
};
