export const SERVICE_URLS = {
  posts: import.meta.env.VITE_POSTS_URL || '',
  comments: import.meta.env.VITE_COMMENTS_URL || '',
  query: import.meta.env.VITE_QUERY_URL || '',
} as const;

export const API_ROUTES = {
  posts: {
    list: '/api/posts',
    create: '/api/posts',
  },
  comments: {
    list: (postId: string) => `/api/comments/${postId}`,
    create: (postId: string) => `/api/comments/${postId}`,
  },
  query: {
    listPosts: '/api/query/posts',
  },
} as const;

export const API = {
  posts: {
    list: () => `${SERVICE_URLS.posts}${API_ROUTES.posts.list}`,
    create: () => `${SERVICE_URLS.posts}${API_ROUTES.posts.create}`,
  },

  comments: {
    list: (postId: string) => `${SERVICE_URLS.comments}${API_ROUTES.comments.list(postId)}`,
    create: (postId: string) => `${SERVICE_URLS.comments}${API_ROUTES.comments.create(postId)}`,
  },

  query: {
    listPosts: () => `${SERVICE_URLS.query}${API_ROUTES.query.listPosts}`,
  },
} as const;
