import axios from 'axios';

import type { EventItem } from '@org/shared';
import { SERVICE_URLS } from '@org/shared';

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
