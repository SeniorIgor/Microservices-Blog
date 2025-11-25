export type RefreshPosts = () => Promise<void>;

export interface CreatePostRequest {
  title: string;
}

export interface CreateCommentRequest {
  content: string;
}
