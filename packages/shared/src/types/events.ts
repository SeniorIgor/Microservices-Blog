import type { Comment } from './comments';
import type { Post } from './posts';

export interface PostComment extends Comment {
  postId: Post['id'];
}

interface CommentCreated {
  type: 'CommentCreated';
  data: PostComment;
}

interface PostCreated {
  type: 'PostCreated';
  data: Post;
}

interface CommentModerated {
  type: 'CommentModerated';
  data: PostComment;
}

interface CommentUpdated {
  type: 'CommentUpdated';
  data: PostComment;
}

export type EventItem = CommentCreated | PostCreated | CommentModerated | CommentUpdated;
