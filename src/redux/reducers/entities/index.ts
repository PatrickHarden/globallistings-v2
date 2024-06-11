import { combineReducers } from 'redux';
import properties from './properties';
import propertySearches from './propertySearches';
import config from './config';
import geocode from './geocode';
import autocomplete from './autocomplete';
import autocompleteSearches from './autocomplete-searches';

export default combineReducers({
  properties,
  propertySearches,
  config,
  geocode,
  autocomplete,
  autocompleteSearches,
});
