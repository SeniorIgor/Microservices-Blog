import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@org/shared';
import { SERVICE_PORTS } from '@org/shared';

import { addNewComment, createNewPost, getPosts, updatePostComment } from './store';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (_req: Request, res: Response) => {
  res.json(getPosts());
});

app.post('/events', (req: Request<unknown, unknown, EventItem>, res: Response) => {
  const { type, data } = req.body;

  switch (type) {
    case 'PostCreated':
      createNewPost(data);
      break;

    case 'CommentCreated':
      addNewComment(data);
      break;

    case 'CommentUpdated':
      updatePostComment(data);
      break;

    default:
      break;
  }

  res.send({});
});

app.listen(SERVICE_PORTS.query, () => {
  console.log(`Query service listening on port ${SERVICE_PORTS.query}`);
});
