import { type FC, useEffect, useState } from 'react';
import axios from 'axios';

import { SERVICE_URLS } from 'shared/constants';
import type { PostsWithCommentsMap } from 'shared/types';

import PostCreate from './components/PostCreate/PostCreate';
import PostList from './components/PostList/PostList';

const App: FC = () => {
  const [posts, setPosts] = useState<PostsWithCommentsMap>({});

  const fetchPosts = async () => {
    const res = await axios.get<PostsWithCommentsMap>(SERVICE_URLS.query.posts.GET());

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
