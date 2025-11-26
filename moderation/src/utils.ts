import type { Comment, CommentStatus } from 'shared/types';

export const validateComment = (comment: Comment) => {
  const status: CommentStatus = comment.content.includes('orange') ? 'rejected' : 'approved';

  return status;
};
