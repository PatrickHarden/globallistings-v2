import { ActionType } from 'typesafe-actions';
import * as actions from '../../actions/autocomplete-request';

export type Actions = ActionType<typeof actions>;

export default (state: string[] = [], action: Actions): string[] => {
  switch (action.type) {
    case 'GET_SUGGESTIONS_SUCCESS':
      return action.payload.result;
    default:
      return state;
  }
};
