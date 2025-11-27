import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import axios from 'axios';

import { SERVICE_URLS } from '@org/shared';

import type { CreatePostRequest, RefreshPosts } from '../../types';

interface PostCreateProps {
  refreshPosts: RefreshPosts;
}

const PostCreate: FC<PostCreateProps> = ({ refreshPosts }) => {
  const [title, setTitle] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CreatePostRequest = { title };

    await axios.post(SERVICE_URLS.posts.posts.POST(), payload);

    await refreshPosts();

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
