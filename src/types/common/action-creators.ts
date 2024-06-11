export const createRequestFailure = <T extends string>(type: T) => (
  payload: Error,
  hash: string
) => ({
  type,
  payload,
  meta: {
    hash,
  },
});

export const createRequestSuccess = <P, T extends string>(type: T) => (
  payload: P,
  hash: string
) => ({
  type,
  payload,
  meta: {
    hash,
    receivedAt: Date.now(),
  },
});

export const createRequestPending = <T extends string>(type: T) => (hash: string) => ({
  type,
  meta: {
    hash,
  },
});
