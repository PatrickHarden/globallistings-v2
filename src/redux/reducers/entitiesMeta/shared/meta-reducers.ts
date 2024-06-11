import { ActionMeta, ReceivedAt, ErrorPayload, HashMeta } from '../../../../types/common/action';

export const handlePending = () => ({
  status: 'PENDING',
});

export const handleSuccess = (action: ActionMeta<ReceivedAt>) => ({
  status: 'SUCCESS',
  createdAt: action.meta.receivedAt,
});

export const handleError = (action: ErrorPayload) => ({
  status: 'ERROR',
  error: action.payload,
});

export const handlePendingState = (state: object, action: ActionMeta<HashMeta>) => ({
  ...state,
  [action.meta.hash]: handlePending(),
});

export const handleErrorState = (state: object, action: ActionMeta<HashMeta> & ErrorPayload) => ({
  ...state,
  [action.meta.hash]: handleError(action),
});

export const handleSuccessState = (state: object, action: ActionMeta<HashMeta & ReceivedAt>) => ({
  ...state,
  [action.meta.hash]: handleSuccess(action),
});
