import { ActionType } from 'typesafe-actions';
import * as geocodeActions from '../../actions/geocode';
import { handlePendingState, handleSuccessState, handleErrorState } from './shared/meta-reducers';

export type GeocodeActions = ActionType<typeof geocodeActions>;

export default (state = {}, action: GeocodeActions) => {
  switch (action.type) {
    case 'GEOCODE_REQUEST':
      return handlePendingState(state, action);
    case 'GEOCODE_SUCCESS':
      return handleSuccessState(state, action);
    case 'GEOCODE_FAILURE':
      return handleErrorState(state, action);
    default:
      return state;
  }
};
