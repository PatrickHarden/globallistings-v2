export const createRequestFailure = <T extends string>(type: T) => (payload: Error) => ({
  type,
  payload,
});

export const createRequestSuccess = <P, T extends string>(type: T) => (payload: P) => ({
  type,
  payload,
  meta: {
    receivedAt: Date.now(),
  },
});

export const createRequestPending = <T extends string>(type: T) => () => ({
  type,
});
