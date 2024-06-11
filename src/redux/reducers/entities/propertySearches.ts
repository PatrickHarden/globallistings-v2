import { Dictionary } from '../../../types/common/dictionary';
import { searchPropertiesSuccess } from '../../actions/searchProperties';
import { ActionType } from 'typesafe-actions';

export type GeocodeActions = ActionType<typeof searchPropertiesSuccess>;

export default (state: Dictionary<string[]> = {}, action: GeocodeActions): Dictionary<string[]> => {
  switch (action.type) {
    case 'SEARCH_PROPERTIES_SUCCESS':
      return { ...state, [action.meta.hash]: action.payload.result };
    default:
      return state;
  }
};
