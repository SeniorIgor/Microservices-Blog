import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@org/shared';
import { sendAnEvent, SERVICE_PORTS } from '@org/shared';

import { createNewComment, getCommentsByPostId, updateCommentStatus } from './store';
import type { CreateCommentsParams, CreateCommentsRequest, GetCommentsParams } from './types';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/comments/:postId', (req: Request<GetCommentsParams>, res: Response) => {
  const comments = getCommentsByPostId(req.params.postId);

  res.send(comments);
});

app.post(
  '/api/comments/:postId',
  async (req: Request<CreateCommentsParams, unknown, CreateCommentsRequest>, res: Response) => {
    const { postId } = req.params;
    const comment = createNewComment(req.body, postId);

    const event: EventItem = { type: 'CommentCreated', data: { ...comment, postId } };

    const { status, errorMessage } = await sendAnEvent(event);

    if (status === 'error') {
      return res.status(500).json({ errorMessage });
    }

    const comments = getCommentsByPostId(postId);

    res.status(201).send(comments);
  },
);

app.post('/api/events', async (req: Request<object, object, EventItem>, res: Response) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    updateCommentStatus(data);

    const { status, errorMessage } = await sendAnEvent({ type: 'CommentUpdated', data });

    if (status === 'error') {
      return res.status(500).json({ errorMessage });
    }
  }

  res.send({});
});

app.listen(SERVICE_PORTS.comments, () => {
  console.log(`Comments service listening on port ${SERVICE_PORTS.comments}`);
});
