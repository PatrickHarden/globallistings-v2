import { combineReducers } from 'redux';
import propertySearches from './propertySearches';
import config from './config';
import geocode from './geocode';
import autocompleteSearches from './autocomplete';

export default combineReducers({
  propertySearches,
  config,
  geocode,
  autocompleteSearches,
});
