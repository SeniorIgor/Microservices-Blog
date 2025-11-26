import type { Comment, CommentStatus } from '@org/shared';

export const validateComment = (comment: Comment) => {
  const status: CommentStatus = comment.content.includes('orange') ? 'rejected' : 'approved';

  return status;
};
