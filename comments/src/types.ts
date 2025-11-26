import type { Comment, Post } from 'shared/types';

export interface GetCommentsParams {
  postId: Post['id'];
}

export type CreateCommentsRequest = Pick<Comment, 'content'>;

export interface CreateCommentsParams {
  postId: Post['id'];
}
