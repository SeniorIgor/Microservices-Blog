import type { EventItem } from '@org/shared';

export const events: Array<EventItem> = [];

export const getAllEvents = () => {
  return events;
};

export const addNewEvent = (event: EventItem) => {
  events.push(event);
};
