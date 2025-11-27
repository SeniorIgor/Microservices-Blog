type ServiceName = 'posts' | 'comments' | 'query' | 'moderation' | 'eventBus';

const getPort = (envName: string, fallback: number): number => {
  const raw = process.env[envName];
  if (!raw) return fallback;

  const num = Number(raw);
  return Number.isNaN(num) ? fallback : num;
};

export const SERVICE_PORTS: Record<ServiceName, number> = {
  posts: getPort('POSTS_PORT', 4000),
  comments: getPort('COMMENTS_PORT', 4001),
  query: getPort('QUERY_PORT', 4002),
  moderation: getPort('MODERATION_PORT', 4003),
  eventBus: getPort('EVENT_BUS_PORT', 4005),
};

const makeLocalUrl = (port: number): string => `http://localhost:${port}`;

export const SERVICE_BASE_URLS: Record<ServiceName, string> = {
  posts: makeLocalUrl(SERVICE_PORTS.posts),
  comments: makeLocalUrl(SERVICE_PORTS.comments),
  query: makeLocalUrl(SERVICE_PORTS.query),
  moderation: makeLocalUrl(SERVICE_PORTS.moderation),
  eventBus: makeLocalUrl(SERVICE_PORTS.eventBus),
};

// Made some change

export const ROUTES = {
  posts: {
    list: '/posts',
    events: '/events',
  },
  comments: {
    list: (postId: string) => `/posts/${postId}/comments`,
    events: '/events',
  },
  query: {
    listPosts: '/posts',
    events: '/events',
  },
  moderation: {
    events: '/events',
  },
  eventBus: {
    events: '/events',
  },
} as const;

export const SERVICE_URLS = {
  posts: {
    list: () => `${SERVICE_BASE_URLS.posts}${ROUTES.posts.list}`,
    create: () => `${SERVICE_BASE_URLS.posts}${ROUTES.posts.list}`,
    events: () => `${SERVICE_BASE_URLS.posts}${ROUTES.posts.events}`,
  },

  comments: {
    list: (postId: string) => `${SERVICE_BASE_URLS.comments}${ROUTES.comments.list(postId)}`,
    create: (postId: string) => `${SERVICE_BASE_URLS.comments}${ROUTES.comments.list(postId)}`,
    events: () => `${SERVICE_BASE_URLS.comments}${ROUTES.comments.events}`,
  },

  query: {
    listPosts: () => `${SERVICE_BASE_URLS.query}${ROUTES.query.listPosts}`,
    events: () => `${SERVICE_BASE_URLS.query}${ROUTES.query.events}`,
  },

  moderation: {
    events: () => `${SERVICE_BASE_URLS.moderation}${ROUTES.moderation.events}`,
  },

  eventBus: {
    events: () => `${SERVICE_BASE_URLS.eventBus}${ROUTES.posts.events}`,
  },
} as const;
