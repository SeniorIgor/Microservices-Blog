import type { FC } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import type { Comment } from '@types';

interface CommentListProps {
  postId: string;
}

const CommentList: FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchData = async () => {
    const res = await axios.get<Comment[]>(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
    // you can add [postId] as dependency if you expect it to change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedComments = comments.map((comment) => <li key={comment.id}>{comment.content}</li>);

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
