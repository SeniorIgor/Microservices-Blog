import type { Comment } from './comments';

interface CommentCreatedData extends Comment {
  postId: string;
}

interface CommentCreated {
  type: 'CommentCreated';
  data: CommentCreatedData;
}

interface PostCreatedData {
  id: string;
  title: string;
}

interface PostCreated {
  type: 'PostCreated';
  data: PostCreatedData;
}

export type EventItem = CommentCreated | PostCreated;
