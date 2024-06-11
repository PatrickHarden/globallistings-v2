import { State } from '../../types/state';
import { theme } from '../../themes/default/theme';
import { createSelector } from 'reselect';
import { FilterType } from '../../types/config';

// State
export const entityMetaSelector = (state: State) => state.entitiesMeta;
export const entitiesSelector = (state: State) => state.entities;
export const uiSelector = (state: State) => state.ui;
export const locationSelector = (state: State) => state.router.location;

// Entities
export const propertiesSelector = createSelector(
  entitiesSelector,
  entities => entities.properties
);

export const geocodeSelector = createSelector(
  entitiesSelector,
  entities => entities.geocode
);

export const propertySearchesSelector = createSelector(
  entitiesSelector,
  entities => entities.propertySearches
);

export const configSelector = createSelector(
  entitiesSelector,
  entities => entities.config
);

export const autocompleteSelector = createSelector(
  entitiesSelector,
  entities => entities.autocomplete
);

export const autocompleteSearchesSelector = createSelector(
  entitiesSelector,
  entities => entities.autocompleteSearches
);

// Meta
export const propertiesMetaSelector = createSelector(
  entityMetaSelector,
  meta => meta.propertySearches
);

export const geocodeMetaSelector = createSelector(
  entityMetaSelector,
  meta => meta.geocode
);

export const configMetaSelector = createSelector(
  entityMetaSelector,
  meta => meta.config
);

export const autocompleteSearchesMetaSelector = createSelector(
  entityMetaSelector,
  meta => meta.autocompleteSearches
);

// Config
export const localeSelector = createSelector(
  configSelector,
  config => config.language
);

export const messagesSelector = createSelector(
  configSelector,
  config => config.i18n
);

export const filtersSelector = createSelector(
  configSelector,
  config => config.filters
);

export const rangeFiltersSelector = createSelector(
  filtersSelector,
  filters => filters.filter(f => f.type === FilterType.range)
);

// Other

// TODO add logic to switch between themes based on config
export const themeSelector = (state: State) => theme;

// TODO figure out where it will be coming from
export const googleMapsApiKeySelector = () => 'AIzaSyCzEw2NaQFixR7sZCLnZ1oGQljW7AxLZ7k';
