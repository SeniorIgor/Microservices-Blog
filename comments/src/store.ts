import { randomBytes } from 'crypto';

import type { Comment } from 'shared/types';

import type { CreateCommentsRequest } from './types';

export const commentsStore: Record<string, Array<Comment>> = {};

export const getCommentsByPostId = (postId: string) => {
  return commentsStore[postId] || [];
};

export const createNewComment = (body: CreateCommentsRequest, postId: string) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = body;

  const comments = getCommentsByPostId(postId);
  const createdComment: Comment = { id: commentId, content, status: 'pending' };

  comments.push(createdComment);
  commentsStore[postId] = comments;

  return createdComment;
};
