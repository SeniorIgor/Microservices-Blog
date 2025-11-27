import axios from 'axios';

import { SERVICE_URLS } from '../constants';
import type { EventItem } from '../types';

export const sendAnEvent = async (event: EventItem) => {
  try {
    await axios.post(SERVICE_URLS.eventBus.events.POST(), event);
  } catch (error) {
    const errorMessage = `Failed to emit ${event.type} event`;

    console.error(errorMessage, error);

    return { status: 'error', error, errorMessage };
  }

  return { status: 'success' };
};
