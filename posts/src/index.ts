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
const posts: Record<string, Post> = {};

app.get('/posts', (_req: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts', (req: Request<object, object, CreatePostRequest>, res: Response) => {
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

  axios.post('http://localhost:4005/events', event);

  res.status(201).send(posts[id]);
});

app.listen(PORT, () => {
  console.log(`Posts service listening on port ${PORT}`);
});
