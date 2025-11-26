export const asyncSetTimeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
