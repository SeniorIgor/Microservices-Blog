import type { FC } from 'react';

import type { Comment } from '@org/shared';

interface CommentListProps {
  comments: Array<Comment>;
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content = '';

    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;

      case 'pending':
        content = 'This comment is awaiting moderation';
        break;

      case 'rejected':
        content = 'This comment has been rejected';
        break;

      default:
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
