import { DeepPartial } from '../../../types/common/deep-partial';
import { Search } from '../../../types/ui';
import * as actions from '../../actions/search';
import { ActionType } from 'typesafe-actions';

export type Actions = ActionType<typeof actions>;

export default (state: DeepPartial<Search> = {}, action: Actions) => {
  switch (action.type) {
    case 'SET_SEARCH_LOCATION':
      return {
        ...state,
        path: action.payload,
      };
    case 'CHANGE_SEARCH_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    default:
      return state;
  }
};
