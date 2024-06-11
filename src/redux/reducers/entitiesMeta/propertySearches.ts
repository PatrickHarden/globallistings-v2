import * as actions from '../../actions/searchProperties';
import { ActionType } from 'typesafe-actions';
import { handlePendingState, handleSuccessState, handleErrorState } from './shared/meta-reducers';

export type Actions = ActionType<typeof actions>;

export default (state = {}, action: Actions) => {
  switch (action.type) {
    case 'SEARCH_PROPERTIES_REQUEST':
      return handlePendingState(state, action);
    case 'SEARCH_PROPERTIES_SUCCESS':
      return handleSuccessState(state, action);
    case 'SEARCH_PROPERTIES_FAILURE':
      return handleErrorState(state, action);
    default:
      return state;
  }
};
