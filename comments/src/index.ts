import cors from 'cors';
import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import express from 'express';

import type { Comment, CreateCommentsParams, CreateCommentsRequest, GetCommentsParams } from './types';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.POSTS_PORT || 4001;
const commentByPostId: Record<string, Array<Comment>> = {};

app.get('/posts/:id/comments', (req: Request<GetCommentsParams>, res: Response) => {
  const { id: postId } = req.params;

  res.send(commentByPostId[postId] || []);
});

app.post('/posts/:id/comments', (req: Request<CreateCommentsParams, object, CreateCommentsRequest>, res: Response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id: postId } = req.params;

  const comments = commentByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`Comments service listening on port ${PORT}`);
});
