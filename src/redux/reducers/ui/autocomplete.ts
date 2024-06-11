import { ActionType } from 'typesafe-actions';
import { suggestionsSuccess } from '../../actions/autocomplete-request';
import { selectedAutocompletionItem } from '../../actions/autocomplete';

import { DeepPartial } from 'redux';
import { Autocomplete } from '../../../types/ui';

export type GeocodeActions = ActionType<
  typeof suggestionsSuccess | typeof selectedAutocompletionItem
>;

export default (
  state: DeepPartial<Autocomplete> = {},
  action: GeocodeActions
): DeepPartial<Autocomplete> => {
  switch (action.type) {
    case 'GET_SUGGESTIONS_SUCCESS':
      return { ...state, searchTerm: action.meta.hash };
    case 'SELECT_AUTOCOMPLETION_ITEM':
      return { ...state, selectedSuggestionId: action.payload };
    default:
      return state;
  }
};
