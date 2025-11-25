interface CommentCreatedData {
  id: string;
  content: string;
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
