import axios from 'axios';
import { stringify } from 'query-string';
import { State } from '../../types/state';
import { propertySearchConfig } from '../selectors/config/autocomplete-config';
import { configSelector } from '../../redux/selectors/state';
import { paramsSelector } from '../../redux/selectors/config/config';
import { suggestionsSuccess, suggestionsFailure, suggestionsRequest } from './autocomplete-request';
import { normaliseAutocompleteResponse, normaliseSearchResponse } from '../../api/normalisers';
import { Autocomplete, NormalisedAutocompleteResult } from '../../types/autocomplete';

export const lookupByPropertyId = (name: string) => (dispatch: Function, getState: () => State) => {
  dispatch(suggestionsRequest(name));
  const emptyResponse = [
    {
      description: '',
      placeId: '',
    },
  ];

  const state = getState();
  const psConfig = propertySearchConfig(state);
  const config = configSelector(state);
  const configParams = paramsSelector(state);
  const site = psConfig.Site;
  const suffixes = configParams.PropertyDefaultEnumerationSuffixes || [''];

  const searchPaths = psConfig.SearchPaths;
  const propertyOrigin = psConfig.PropertyOrigins !== undefined ? psConfig.PropertyOrigins : '';

  const propertyIdQuery = name.toLowerCase().includes(propertyOrigin.toLowerCase())
    ? suffixes.map(suffix => `${name}${suffix}`).join()
    : suffixes.map(suffix => `${propertyOrigin}${name}${suffix}`).join();

  const params = { Site: site, 'Common.PrimaryKey': propertyIdQuery };
  const url = config.api;

  return axios
    .get(`${url}/propertylistings/query`, {
      params,
    })
    .then(resp => {
      if (resp.data.DocumentCount > 0) {
        // TODO create a better model so an array indexer isn't required
        const suggestions = normaliseSearchResponse(psConfig!)(resp.data.Documents[0]);
        const normalisedAutocompleteResponse = normaliseAutocompleteResponse(suggestions);

        dispatch(suggestionsSuccess(normalisedAutocompleteResponse, name));
      }
    })
    .catch(ex => {
      const normalisedData = normaliseAutocompleteResponse(emptyResponse);
      dispatch(suggestionsFailure(ex, name));
    });
};
