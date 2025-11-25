import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import axios from 'axios';

import type { CreateCommentRequest, RefreshPosts } from '../../types';

interface CommentCreateProps {
  postId: string;
  refreshPosts: RefreshPosts;
}

const CommentCreate: FC<CommentCreateProps> = ({ postId, refreshPosts }) => {
  const [content, setContent] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CreateCommentRequest = { content };

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, payload);

    await refreshPosts();

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input value={content} onChange={(e) => setContent(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
