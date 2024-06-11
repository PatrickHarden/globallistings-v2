export const buildUrl = (path: string, query: string | undefined) => {
  if (query === '' || !query) {
    return path;
  }
  if (query.startsWith('?')) {
    return `${path}${query}`;
  }

  return `${path}?${query}`;
};
