import * as actions from '../../actions/config';
import { ActionType } from 'typesafe-actions';
import { handleError, handleSuccess, handlePending } from './shared/meta-reducers';

export type Actions = ActionType<typeof actions>;

export default (state = {}, action: Actions) => {
  switch (action.type) {
    case 'FETCH_CONFIG_REQUEST':
      return handlePending();
    case 'FETCH_CONFIG_SUCCESS':
      return handleSuccess(action);
    case 'FETCH_CONFIG_FAILURE':
      return handleError(action);
    default:
      return state;
  }
};
