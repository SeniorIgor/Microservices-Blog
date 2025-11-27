import cors from 'cors';
import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem, Post } from '@org/shared';
import { sendAnEvent, SERVICE_PORTS } from '@org/shared';

import type { CreatePostRequest } from './types';

const app = express();
app.use(express.json());
app.use(cors());

const posts: Record<string, Post> = {};

app.get('/posts', (_req: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts', async (req: Request<object, object, CreatePostRequest>, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({ error: 'Title is required' });
  }

  const id = randomBytes(4).toString('hex');

  posts[id] = { id, title };

  const event: EventItem = {
    type: 'PostCreated',
    data: { id, title },
  };

  const { status, errorMessage } = await sendAnEvent(event);

  if (status === 'error') {
    return res.status(500).json({ errorMessage });
  }

  res.status(201).send(posts[id]);
});

app.post('/events', (req: Request<object, object, EventItem>, res: Response) => {
  console.log('Posts Service Received Event', req.body.type);

  res.send({});
});

app.listen(SERVICE_PORTS.posts, () => {
  console.log(`Posts service listening on port ${SERVICE_PORTS.posts}`);
});
