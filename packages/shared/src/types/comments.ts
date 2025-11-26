export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface Comment {
  id: string;
  content: string;
  status: CommentStatus;
}
