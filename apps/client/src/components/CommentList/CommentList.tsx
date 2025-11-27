import type { FC } from 'react';

import type { Comment } from '@org/shared';

interface CommentListProps {
  comments: Array<Comment>;
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  const renderedComments = comments.map((comment) => <li key={comment.id}>{comment.content}</li>);

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
