import { Request, Response } from 'express';
import { BaseError, GetDataType, KbdEvent } from '../types.js';
import { getData } from './getData.js';

const get = (): KbdEvent[] | BaseError => {
  const data = getData();

  if (data.status !== 200) {
    return data as BaseError;
  }

  return (data as GetDataType).events;
};

export const getEvents = (
  _: Request,
  res: Response<KbdEvent[] | BaseError>
) => {
  res.send(get());
};
