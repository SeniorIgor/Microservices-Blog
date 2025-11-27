import { type FC, useEffect, useState } from 'react';
import axios from 'axios';

import type { PostsWithCommentsMap } from '@org/shared';

import PostCreate from './components/PostCreate/PostCreate';
import PostList from './components/PostList/PostList';
import { API } from './constants';

const App: FC = () => {
  const [posts, setPosts] = useState<PostsWithCommentsMap>({});

  const fetchPosts = async () => {
    const res = await axios.get<PostsWithCommentsMap>(API.query.listPosts());

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate refreshPosts={fetchPosts} />
      <hr />
      <h1>Posts</h1>
      <PostList posts={posts} refreshPosts={fetchPosts} />
    </div>
  );
};

export default App;
