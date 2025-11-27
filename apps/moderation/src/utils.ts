import type { Comment, CommentStatus } from '@org/shared';

export const BANNED_WORDS = ['orange', 'banana'] as const;

const escapeRegExp = (word: string) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Creates: /(orange|banana)/i
export const BANNED_REGEX = new RegExp(BANNED_WORDS.map(escapeRegExp).join('|'), 'i');

export const validateComment = (comment: Comment): CommentStatus => {
  if (BANNED_REGEX.test(comment.content)) {
    return 'rejected';
  }

  return 'approved';
};
