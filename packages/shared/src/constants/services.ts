// TYPES
type ServiceName = 'posts' | 'comments' | 'query' | 'moderation' | 'eventBus';

// ENV HELPERS
const requireEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }

  return value.replace(/\/+$/, ''); // remove trailing slash
};

// PORT HELPER (fixed!)
const getPort = (envName: string, fallback: number): number => {
  const raw = process.env[envName];

  if (!raw) {
    return fallback;
  }

  const num = Number(raw);

  return Number.isNaN(num) ? fallback : num;
};

// PORTS THAT SERVICES LISTEN ON
export const SERVICE_PORTS = {
  posts: getPort('POSTS_PORT', 4000),
  comments: getPort('COMMENTS_PORT', 4001),
  query: getPort('QUERY_PORT', 4002),
  moderation: getPort('MODERATION_PORT', 4003),
  eventBus: getPort('EVENT_BUS_PORT', 4005),
};

// BASE URLS (FROM ENV)
export const SERVICE_BASE_URLS: Record<ServiceName, string> = {
  posts: requireEnv('POSTS_URL'),
  comments: requireEnv('COMMENTS_URL'),
  query: requireEnv('QUERY_URL'),
  moderation: requireEnv('MODERATION_URL'),
  eventBus: requireEnv('EVENT_BUS_URL'),
};

// ROUTES
export const ROUTES = {
  posts: {
    list: '/api/posts',
    events: '/api/events',
  },
  comments: {
    list: (postId: string) => `/api/comments/${postId}`,
    events: '/api/events',
  },
  query: {
    listPosts: '/api/query/posts',
    events: '/api/events',
  },
  moderation: {
    events: '/api/events',
  },
  eventBus: {
    events: '/api/events',
  },
} as const;

// FINAL URL BUILDERS
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
    events: () => `${SERVICE_BASE_URLS.eventBus}${ROUTES.eventBus.events}`,
    create: () => `${SERVICE_BASE_URLS.eventBus}${ROUTES.eventBus.events}`,
  },
} as const;
