import { placesAutocomplete } from '../../api/google-maps/places';
import { State } from '../../types/state';
import { placeAutoCompleteConfig } from '../selectors/config/autocomplete-config';
import {
  createRequestPending,
  createRequestFailure,
  createRequestSuccess,
} from '../../types/common/action-creators';
import { normaliseAutocompleteResponse } from '../../api/normalisers';
import { NormalisedAutocompleteResult } from '../../types/autocomplete';

export const suggestionsRequest = createRequestPending('GET_SUGGESTIONS_REQUEST');
export const suggestionsFailure = createRequestFailure('GET_SUGGESTIONS_FAILURE');
export const suggestionsSuccess = createRequestSuccess<
  NormalisedAutocompleteResult,
  'GET_SUGGESTIONS_SUCCESS'
>('GET_SUGGESTIONS_SUCCESS');

export const lookupPlaceByName = (name: string) => (dispatch: Function, getState: () => State) => {
  dispatch(suggestionsRequest(name));
  const state = getState();
  const config = placeAutoCompleteConfig(state);

  return placesAutocomplete(name, config)
    .then(suggestions => {
      const normalisedData = normaliseAutocompleteResponse(suggestions);
      dispatch(suggestionsSuccess(normalisedData, name));
    })
    .catch(ex => {
      dispatch(suggestionsFailure(ex, name));
    });
};
