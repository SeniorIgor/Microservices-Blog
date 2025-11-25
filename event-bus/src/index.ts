import axios from 'axios';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@types';

const app = express();
app.use(express.json());

const PORT = process.env.EVENT_BUS_PORT || 4005;

app.post('/events', async (req: Request<object, object, EventItem>, res: Response) => {
  const event = req.body;

  const targets = [
    process.env.POSTS_SERVICE_URL ?? 'http://localhost:4000/events',
    process.env.COMMENTS_SERVICE_URL ?? 'http://localhost:4001/events',
    process.env.QUERY_SERVICE_URL ?? 'http://localhost:4002/events',
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

app.listen(PORT, () => {
  console.log(`Event-Bus service listening on port ${PORT}`);
});
