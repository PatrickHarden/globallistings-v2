import { ActionType } from 'typesafe-actions';
import * as actions from '../../actions/autocomplete-request';
import { handlePendingState, handleErrorState, handleSuccessState } from './shared/meta-reducers';

export type Actions = ActionType<typeof actions>;

export default (state = {}, action: Actions) => {
  switch (action.type) {
    case 'GET_SUGGESTIONS_REQUEST':
      return handlePendingState(state, action);
    case 'GET_SUGGESTIONS_SUCCESS':
      return handleSuccessState(state, action);
    case 'GET_SUGGESTIONS_FAILURE':
      return handleErrorState(state, action);
    default:
      return state;
  }
};
