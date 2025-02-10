import { FormState } from 'informed';
import { KbdFullEventData, Status } from '../types';
import { apiUrl } from './constants';

const createEvent = async (
  data: KbdFullEventData
): Promise<KbdFullEventData & Status> => {
  const { tickets, ...eventData } = data;
  const request = await fetch(`${apiUrl}/events`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: eventData,
      tickets,
    }),
  });
  const event = await request.json();
  console.log('debug', event);
  return event;
};

export const handleSubmit = async ({ values }: FormState): Promise<void> => {
  const sendData = await createEvent(values as KbdFullEventData);
  console.log('debug', { sendData });
};
