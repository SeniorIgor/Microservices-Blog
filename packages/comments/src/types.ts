import type { Comment, Post } from '@org/shared';

export interface GetCommentsParams {
  postId: Post['id'];
}

export type CreateCommentsRequest = Pick<Comment, 'content'>;

export interface CreateCommentsParams {
  postId: Post['id'];
}
