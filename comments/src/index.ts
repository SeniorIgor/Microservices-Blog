import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

import { SERVICE_PORTS } from 'shared/constants';
import type { EventItem } from 'shared/types';
import { sendAnEvent } from 'shared/utils';

import { createNewComment, getCommentsByPostId } from './store';
import type { CreateCommentsParams, CreateCommentsRequest, GetCommentsParams } from './types';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts/:postId/comments', (req: Request<GetCommentsParams>, res: Response) => {
  const comments = getCommentsByPostId(req.params.postId);

  res.send(comments);
});

app.post(
  '/posts/:postId/comments',
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

app.post('/events', (req: Request<object, object, EventItem>, res: Response) => {
  console.log('Comments Service Received Event', req.body.type);

  res.send({});
});

app.listen(SERVICE_PORTS.comments, () => {
  console.log(`Comments service listening on port ${SERVICE_PORTS.comments}`);
});
