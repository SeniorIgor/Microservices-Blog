import type { Comment } from './comments';
import type { Post } from './posts';

interface CommentData extends Comment {
  postId: string;
}

interface CommentCreated {
  type: 'CommentCreated';
  data: CommentData;
}

interface PostCreated {
  type: 'PostCreated';
  data: Post;
}

interface CommentModerated {
  type: 'CommentModerated';
  data: CommentData;
}

export type EventItem = CommentCreated | PostCreated | CommentModerated;
