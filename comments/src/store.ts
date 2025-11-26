import { randomBytes } from 'crypto';

import type { Comment, Post, PostComment } from 'shared/types';

import type { CreateCommentsRequest } from './types';

export const commentsStore: Record<string, Array<Comment>> = {};

export const getCommentsByPostId = (postId: Post['id']) => {
  return commentsStore[postId] || [];
};

export const createNewComment = (body: CreateCommentsRequest, postId: Post['id']) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = body;

  const comments = getCommentsByPostId(postId);
  const createdComment: Comment = { id: commentId, content, status: 'pending' };

  comments.push(createdComment);
  commentsStore[postId] = comments;

  return createdComment;
};

export const updateCommentStatus = (data: PostComment) => {
  const comments = getCommentsByPostId(data.postId);

  comments.forEach((item) => {
    if (item.id === data.id) {
      item.status = data.status;
    }
  });
};
