import axios from 'axios';
import cors from 'cors';
import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@types';

import type { CreatePostRequest, Post } from './types';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.POSTS_PORT || 4000;
const EVENT_BUS_URL = process.env.EVENT_BUS_URL ?? 'http://localhost:4005';
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

  try {
    await axios.post(`${EVENT_BUS_URL}/events`, event);
  } catch (error) {
    console.error('Failed to emit PostCreated event', error);

    return res.status(500).json({ error: 'Failed to emit event' });
  }

  res.status(201).send(posts[id]);
});

app.post('/events', (req: Request<object, object, EventItem>, res: Response) => {
  console.log('Posts Service Received Event', req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Posts service listening on port ${PORT}`);
});
