import { ActionType } from 'typesafe-actions';
import { suggestionsSuccess } from '../../actions/autocomplete-request';
import { Dictionary } from '../../../types/common/dictionary';
import { Autocomplete } from '../../../types/autocomplete';

export type GeocodeActions = ActionType<typeof suggestionsSuccess>;

export default (
  state: Dictionary<Autocomplete> = {},
  action: GeocodeActions
): Dictionary<Autocomplete> => {
  switch (action.type) {
    case 'GET_SUGGESTIONS_SUCCESS':
      return { ...state, ...action.payload.entities.suggestions };
    default:
      return state;
  }
};
