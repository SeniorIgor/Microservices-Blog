import type { Comment, Post } from '@types';

export interface PostsWithComments extends Post {
  comments: Array<Comment>;
}
