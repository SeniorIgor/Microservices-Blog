export const SERVICE_URLS = {
  posts: import.meta.env.VITE_POSTS_URL ?? 'http://localhost:4000',
  comments: import.meta.env.VITE_COMMENTS_URL ?? 'http://localhost:4001',
  query: import.meta.env.VITE_QUERY_URL ?? 'http://localhost:4002',
} as const;

export const ROUTES = {
  posts: {
    list: '/posts',
    create: '/posts',
  },
  comments: {
    list: (postId: string) => `/posts/${postId}/comments`,
    create: (postId: string) => `/posts/${postId}/comments`,
  },
  query: {
    listPosts: '/posts',
  },
} as const;

export const API = {
  posts: {
    list: () => `${SERVICE_URLS.posts}${ROUTES.posts.list}`,
    create: () => `${SERVICE_URLS.posts}${ROUTES.posts.create}`,
  },

  comments: {
    list: (postId: string) => `${SERVICE_URLS.comments}${ROUTES.comments.list(postId)}`,
    create: (postId: string) => `${SERVICE_URLS.comments}${ROUTES.comments.create(postId)}`,
  },

  query: {
    listPosts: () => `${SERVICE_URLS.query}${ROUTES.query.listPosts}`,
  },
} as const;
