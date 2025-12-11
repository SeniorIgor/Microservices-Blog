import axios from 'axios';
import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@org/shared';
import { SERVICE_PORTS, SERVICE_URLS } from '@org/shared';

import { getPosts, handleEvent, initializeStore } from './store';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (_req: Request, res: Response) => {
  res.send(getPosts());
});

app.post('/events', (req: Request<unknown, unknown, EventItem>, res: Response) => {
  handleEvent(req.body);

  res.send({});
});

app.listen(SERVICE_PORTS.query, async () => {
  console.log(`Query service listening on port ${SERVICE_PORTS.query}`);

  const { data, status } = await axios.get(SERVICE_URLS.eventBus.events());

  if (status === 200) {
    initializeStore(data);
  } else {
    console.error('[query] Failed to initialize store', data);
  }
});
