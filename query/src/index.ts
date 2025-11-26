import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

import { SERVICE_PORTS } from 'shared/constants';
import type { EventItem, PostsWithCommentsMap } from 'shared/types';

const app = express();
app.use(express.json());
app.use(cors());

const posts: PostsWithCommentsMap = {};

app.get('/posts', (_req: Request, res: Response) => {
  res.json(posts);
});

app.post('/events', (req: Request<unknown, unknown, EventItem>, res: Response) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { postId, ...comment } = data;
    const post = posts[postId];

    if (post) {
      post.comments.push(comment);
    }
  }

  res.send({});
});

app.listen(SERVICE_PORTS.query, () => {
  console.log(`Query service listening on port ${SERVICE_PORTS.query}`);
});
