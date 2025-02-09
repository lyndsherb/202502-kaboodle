import { Request, Response } from 'express';
import fs from 'fs';
import { BaseError, KbdEvent } from '../types.js';

const get = () => {
  try {
    const dataEvents = fs.readFileSync('./data/events.json', 'utf-8');
    return JSON.parse(dataEvents);
  } catch (error) {
    return {
      status: 500,
      error,
      message: 'Failed to fetch event list',
    };
  }
};

export const getEvents = (
  _: Request,
  res: Response<KbdEvent[] | BaseError>
) => {
  res.send(get());
};
