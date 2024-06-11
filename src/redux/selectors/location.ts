import { createSelector } from 'reselect';
import { locationSelector, geocodeSelector } from './state';
import { parseUrl } from 'query-string';
import { plpUrlPathParamsSelector, pathParamsSelector } from './match';

export const queryStringSelector = createSelector(
  locationSelector,
  location => location.search
);

export const pathSelector = createSelector(
  locationSelector,
  location => location.pathname
);

export const locationQuerySelector = createSelector(
  queryStringSelector,
  queryString => parseUrl(queryString).query
);

export const querySelector = createSelector(
  queryStringSelector,
  location => parseUrl(location).query
);

export const locationParamsSelector = createSelector(
  locationQuerySelector,
  pathParamsSelector,
  (query, params) => ({ ...query, ...params })
);

export const plpLocationNameSelector = createSelector(
  plpUrlPathParamsSelector,
  params => params.location
);

export const plpTransactionTypeSelector = createSelector(
  plpUrlPathParamsSelector,
  params => params.transactionType
);

export const plpLocationSelector = createSelector(
  plpLocationNameSelector,
  geocodeSelector,
  (locationName, geocode) => {
    const location = geocode[locationName];
    if (!location) {
      throw new Error('Failed retrieving geocoding for the location');
    }

    return location;
  }
);

export const plpLocationRadiusSelector = createSelector(
  locationQuerySelector,
  ({ radius }) => {
    if (Array.isArray(radius)) {
      throw new Error('radius can not be an array');
    }

    return radius;
  }
);
