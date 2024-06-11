import { createSelector } from 'reselect';
import {
  geocodeMetaSelector,
  propertiesMetaSelector,
  propertySearchesSelector,
  configSelector,
} from './state';
import { propertiesSearchRequestQuerySelector } from './search-api-request';
import { murmur2 } from 'murmurhash-js';
import { plpLocationNameSelector } from './location';
import { otherConfigsSelector } from './config/config';
import { plpUrlPathParamsSelector, plpMatchSelector } from './match';

export const plpQueryHashSelector = createSelector(
  propertiesSearchRequestQuerySelector,
  query => murmur2(JSON.stringify(query)).toString()
);

export const plpPropertyRequestStatus = createSelector(
  plpQueryHashSelector,
  propertiesMetaSelector,
  (hash, propertiesMeta) => {
    const propertyMeta = propertiesMeta[hash];
    if (propertyMeta === undefined) {
      return 'NONE';
    }

    return propertyMeta.status;
  }
);

export const propertySearchSelector = createSelector(
  propertySearchesSelector,
  plpQueryHashSelector,
  (propertySearches, hash) => {
    const result = propertySearches[hash];

    if (result) {
      return result;
    }

    return [];
  }
);

const plpLocationGeocodeStatus = createSelector(
  plpLocationNameSelector,
  geocodeMetaSelector,
  (location, meta) => {
    const entityMeta = meta[location];
    return entityMeta ? entityMeta.status : 'NONE';
  }
);

export const isPlpLocationGeocoded = createSelector(
  plpLocationGeocodeStatus,
  status => status === 'SUCCESS'
);

export const isUsageTypeConfigLoaded = createSelector(
  configSelector,
  plpUrlPathParamsSelector,
  (config, path) => {
    if (!config.currentConfig) {
      return true;
    }

    return path.usageType === config.currentConfig;
  }
);

export const usageTypeSelector = createSelector(
  plpUrlPathParamsSelector,
  params => params.usageType
);

export const configEndpointForCurrentUsageTypeSelector = createSelector(
  usageTypeSelector,
  otherConfigsSelector,
  (usageType, configs) => {
    const config = configs.find(c => c.name === usageType);
    if (!config) {
      throw new Error('Config is missing data for config endpoint mapping');
    }

    return config.endpoint;
  }
);

export const isPlpPath = createSelector(
  plpMatchSelector,
  match => !!match
);
