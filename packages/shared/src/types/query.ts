import type { Comment } from './comments';
import type { Post } from './posts';

export interface PostsWithComments extends Post {
  comments: Array<Comment>;
}

export type PostsWithCommentsMap = Record<string, PostsWithComments>;
