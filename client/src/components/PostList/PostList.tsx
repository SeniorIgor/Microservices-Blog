import type { FC } from 'react';
import type { RefreshPosts } from 'client/src/types';

import type { PostsWithCommentsMap } from '@types';

import CommentCreate from '../CommentCreate/CommentCreate';
import CommentList from '../CommentList/CommentList';

interface PostListProps {
  posts: PostsWithCommentsMap;
  refreshPosts: RefreshPosts;
}

const PostList: FC<PostListProps> = ({ posts, refreshPosts }) => {
  const renderedPosts = Object.values(posts).map((post) => (
    <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} refreshPosts={refreshPosts} />
      </div>
    </div>
  ));

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>;
};

export default PostList;
