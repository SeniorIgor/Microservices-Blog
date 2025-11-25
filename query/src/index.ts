import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@types';

import type { PostsWithComments } from './types';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.QUERY_POST || 4002;
const posts: Record<string, PostsWithComments> = {};

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
    const { id, content, postId } = data;
    const post = posts[postId];

    if (post) {
      post.comments.push({ id, content });
    }
  }

  console.log(posts);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Query service listening on port ${PORT}`);
});
