import axios from 'axios';
import { createStandardAction } from 'typesafe-actions';

import { normaliseApiResponse } from '../../api/normalisers';
import { State } from '../../types/state';
import { NormalisedSearchResult } from '../../types/results';
import {
  createRequestPending,
  createRequestFailure,
  createRequestSuccess,
} from '../../types/common/action-creators';
import {} from '../selectors/property-search-results';
import {
  propertiesSearchRequestQuerySelector,
  propertySearchRequestQuerySelector,
} from '../selectors/search-api-request';
import { plpQueryHashSelector } from '../selectors/plp';
import { stringify } from 'query-string';
import { propertyIdSelector, propertyDetailsSelector } from '../selectors/pdp';
import { docToProperty } from '../../api/normalisers/doc-to-property-mapper';
import { Property } from '../../types/property';
import { Dictionary } from '../../types/common/dictionary';

export const searchPropertiesSuccess = createRequestSuccess<
  NormalisedSearchResult,
  'SEARCH_PROPERTIES_SUCCESS'
>('SEARCH_PROPERTIES_SUCCESS');
export const searchPropertiesRequest = createRequestPending('SEARCH_PROPERTIES_REQUEST');
export const searchPropertiesFailure = createRequestFailure('SEARCH_PROPERTIES_FAILURE');

export const fetchProperties = () => (dispatch: Function, getState: () => State) => {
  const state = getState();
  const params = propertiesSearchRequestQuerySelector(state);
  const hash = plpQueryHashSelector(state);
  dispatch(searchPropertiesRequest(hash));

  return axios
    .get('/api/propertylistings/query', {
      params,
      paramsSerializer: stringify,
    })
    .then(res => {
      // TODO Update to dynamic locale once we have that setup
      const normalisedData = normaliseApiResponse('en-GB')(res.data);
      dispatch(searchPropertiesSuccess(normalisedData, hash));
    })
    .catch(ex => {
      dispatch(searchPropertiesFailure(ex, hash));
    });
};

export const searchPropertyRequest = createStandardAction('SEARCH_PROPERTY_REQUEST');
export const searchPropertySuccess = createStandardAction('SEARCH_PROPERTY_SUCCESS')<
  Dictionary<Property>
>();
export const searchPropertyFailure = createStandardAction('SEARCH_PROPERTY_FAILURE')<Error>();

export const fetchPropertyIfRequired = () => (dispatch: Function, getState: () => State) => {
  const state = getState();
  const propertyId = propertyIdSelector(state);
  const params = propertySearchRequestQuerySelector(state);
  const isPropertyDetailsLoaded = propertyDetailsSelector(state);
  if (isPropertyDetailsLoaded) {
    return;
  }

  dispatch(searchPropertyRequest());

  return axios
    .get(`/api/propertylisting/${propertyId}`, { params })
    .then(res => {
      // TODO Update to dynamic locale once we have that setup
      const normalisedData = docToProperty('en-GB')(res.data.Document);
      if (!normalisedData) {
        const err = Error('Failed mapping property');
        return dispatch(searchPropertyFailure(err));
      }
      dispatch(searchPropertySuccess({ [propertyId]: normalisedData }));
    })
    .catch(ex => {
      dispatch(searchPropertyFailure(ex));
    });
};
