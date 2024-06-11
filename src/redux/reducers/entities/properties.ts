import { Dictionary } from '../../../types/common/dictionary';
import { Property } from '../../../types/property';
import * as actions from '../../actions/searchProperties';
import { ActionType } from 'typesafe-actions';

export type Actions = ActionType<typeof actions>;

export default (state: Dictionary<Property> = {}, action: Actions): Dictionary<Property> => {
  switch (action.type) {
    case 'SEARCH_PROPERTIES_SUCCESS':
      return {
        ...state,
        ...action.payload.entities.properties,
      };
    case 'SEARCH_PROPERTY_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
