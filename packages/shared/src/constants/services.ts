export const SERVICE_PORTS = {
  client: process.env.CLIENT_PORT || 3000,
  posts: process.env.POSTS_PORT || 4000,
  comments: process.env.COMMENTS_PORT || 4001,
  query: process.env.QUERY_POST || 4002,
  moderation: process.env.MODERATION_PORT || 4003,
  eventBus: process.env.EVENT_BUS_PORT || 4005,
};

const CLIENT_URL = `http://localhost${SERVICE_PORTS.client}`;
const POSTS_URL = `http://localhost${SERVICE_PORTS.client}`;
const COMMENTS_URL = `http://localhost${SERVICE_PORTS.client}`;
const EVENT_BUS_URL = `http://localhost${SERVICE_PORTS.client}`;
const MODERATION_URL = `http://localhost${SERVICE_PORTS.client}`;
const QUERY_URL = `http://localhost${SERVICE_PORTS.client}`;

export const SERVICE_URLS = {
  client: {
    home: CLIENT_URL,
  },
  posts: {
    home: POSTS_URL,
    posts: {
      GET: () => `${POSTS_URL}/posts`,
      POST: () => `${POSTS_URL}/posts`,
    },
    events: {
      POST: () => `${POSTS_URL}/events`,
    },
  },
  comments: {
    home: COMMENTS_URL,
    comments: {
      GET: (postId: string) => `${COMMENTS_URL}/posts/${postId}/comments`,
      POST: (postId: string) => `${COMMENTS_URL}/posts/${postId}/comments`,
    },
    events: {
      POST: () => `${COMMENTS_URL}/events`,
    },
  },
  eventBus: {
    home: EVENT_BUS_URL,
    events: {
      POST: () => `${EVENT_BUS_URL}/events`,
    },
  },
  moderation: {
    home: MODERATION_URL,
    events: {
      POST: () => `${MODERATION_URL}/events`,
    },
  },
  query: {
    home: QUERY_URL,
    posts: {
      GET: () => `${QUERY_URL}/posts`,
    },
    events: {
      POST: () => `${QUERY_URL}/events`,
    },
  },
};
