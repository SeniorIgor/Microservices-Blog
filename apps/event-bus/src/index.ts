import axios from 'axios';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@org/shared';
import { SERVICE_PORTS, SERVICE_URLS } from '@org/shared';

import { addNewEvent, getAllEvents } from './store';

const app = express();
app.use(express.json());

app.post('/api/events', async (req: Request<unknown, unknown, EventItem>, res: Response) => {
  const event = req.body;

  addNewEvent(event);

  const targets = [
    SERVICE_URLS.posts.events(),
    SERVICE_URLS.comments.events(),
    SERVICE_URLS.query.events(),
    SERVICE_URLS.moderation.events(),
  ];

  await Promise.all(
    targets.map((url) =>
      axios.post(url, event).catch((err) => {
        console.error(`Error sending event ${event.type} to ${url}:`, err.message);
      }),
    ),
  );

  res.send({ status: 'OK' });
});

app.get('/api/events', (_req: Request, res: Response) => {
  res.send(getAllEvents());
});

app.listen(SERVICE_PORTS.eventBus, () => {
  console.log(`Event-Bus service listening on port ${SERVICE_PORTS.eventBus}`);
});
