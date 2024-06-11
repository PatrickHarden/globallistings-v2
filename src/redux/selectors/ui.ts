import { createSelector } from 'reselect';

import { uiSelector, autocompleteSearchesSelector, autocompleteSelector } from './state';

export const searchPathSelector = createSelector(
  uiSelector,
  ui => ui.search.path
);

const selectedAutocompleteId = createSelector(
  uiSelector,
  ui => ui.autocomplete.selectedSuggestionId
);

export const selectedFiltersSelector = createSelector(
  uiSelector,
  ui => ui.search.filters
);

export const suggestionsSelector = createSelector(
  autocompleteSearchesSelector,
  autocompleteSelector,
  (suggestionIds, autocomplete) => suggestionIds.map(id => autocomplete[id]!)
);

export const selectedSuggestionSelector = createSelector(
  autocompleteSelector,
  selectedAutocompleteId,
  (suggestions, suggestionId) =>
    suggestionId !== undefined ? suggestions[suggestionId] : undefined
);

export const selectedPropertyPinSelector = createSelector(
  uiSelector,
  ui => ui.map.selectedPropertyPin
);

export const highlightedPropertySelector = createSelector(
  uiSelector,
  ui => ui.list.highlightedProperty
);
