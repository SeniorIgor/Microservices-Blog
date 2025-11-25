export interface Post {
  id: string;
  title: string;
}

export interface Comment {
  id: string;
  content: string;
}

export interface CreatePostRequest {
  title: string;
}

export interface CreateCommentRequest {
  content: string;
}
