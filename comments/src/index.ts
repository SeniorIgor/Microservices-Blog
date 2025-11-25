import axios from 'axios';
import cors from 'cors';
import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@types';

import type { Comment, CreateCommentsParams, CreateCommentsRequest, GetCommentsParams } from './types';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.POSTS_PORT || 4001;
const EVENT_BUS_URL = process.env.EVENT_BUS_URL ?? 'http://localhost:4005';
const commentByPostId: Record<string, Array<Comment>> = {};

app.get('/posts/:id/comments', (req: Request<GetCommentsParams>, res: Response) => {
  const { id: postId } = req.params;

  res.send(commentByPostId[postId] || []);
});

app.post(
  '/posts/:id/comments',
  async (req: Request<CreateCommentsParams, object, CreateCommentsRequest>, res: Response) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id: postId } = req.params;

    const comments = commentByPostId[postId] || [];

    comments.push({ id: commentId, content });

    commentByPostId[postId] = comments;

    const event: EventItem = {
      type: 'CommentCreated',
      data: { id: commentId, content, postId },
    };

    try {
      await axios.post(`${EVENT_BUS_URL}/events`, event);
    } catch (error) {
      console.error('Failed to emit CommentCreated event', error);

      return res.status(500).json({ error: 'Failed to emit event' });
    }

    res.status(201).send(comments);
  },
);

app.post('/events', (req: Request<object, object, EventItem>, res: Response) => {
  console.log('Comments Service Received Event', req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Comments service listening on port ${PORT}`);
});
