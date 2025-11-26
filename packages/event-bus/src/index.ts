import axios from 'axios';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@org/shared';
import { SERVICE_PORTS, SERVICE_URLS } from '@org/shared';

const app = express();
app.use(express.json());

app.post('/events', async (req: Request<object, object, EventItem>, res: Response) => {
  const event = req.body;

  const targets = [
    SERVICE_URLS.posts.events.POST(),
    SERVICE_URLS.comments.events.POST(),
    SERVICE_URLS.query.events.POST(),
    SERVICE_URLS.moderation.events.POST(),
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

app.listen(SERVICE_PORTS.eventBus, () => {
  console.log(`Event-Bus service listening on port ${SERVICE_PORTS.eventBus}`);
});
