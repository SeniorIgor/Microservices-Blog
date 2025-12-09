import type { EventItem, Post, PostComment, PostsWithComments, PostsWithCommentsMap } from '@org/shared';

const postsStore: PostsWithCommentsMap = {};

export const getPosts = () => postsStore;

export const getPostByPostId = (postId: Post['id']): PostsWithComments | undefined => {
  return postsStore[postId];
};

export const createNewPost = (data: Post) => {
  const { id, title } = data;

  postsStore[id] = { id, title, comments: [] };
};

export const addNewComment = (data: PostComment) => {
  const { postId, ...comment } = data;
  const post = getPostByPostId(postId);

  if (!post) {
    return;
  }

  post.comments.push(comment);
};

export const updatePostComment = (data: PostComment) => {
  const { postId, ...comment } = data;

  const post = getPostByPostId(postId);

  if (!post) {
    return;
  }

  post.comments = post.comments.map((item) => {
    if (item.id === data.id) {
      return comment;
    }

    return item;
  });
};

export const handleEvent = ({ type, data }: EventItem) => {
  switch (type) {
    case 'PostCreated':
      createNewPost(data);
      break;

    case 'CommentCreated':
      addNewComment(data);
      break;

    case 'CommentUpdated':
      updatePostComment(data);
      break;

    default:
      break;
  }
};

export const initializeStore = (events: Array<EventItem>) => {
  events.forEach((event) => {
    handleEvent(event);
  });
};
