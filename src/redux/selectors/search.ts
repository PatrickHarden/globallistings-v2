// @ts-nocheck
import { createSelector } from 'reselect';
import { stringify } from 'querystring';

import { configSelector, filtersSelector } from './state';
import { intlSelector } from './intl';
import {
  searchPathSelector as uiSearchPathSelector,
  suggestionsSelector,
  selectedSuggestionSelector,
  selectedFiltersSelector,
} from './ui';
import {
  hideBuyButtonSelector,
  hideLetButtonSelector,
  searchResultsPageSelector,
  searchPathSelectorSelector as configSearchPathSelectorSelector,
} from './config/config';
import { defaultFiltersParamsSelectors } from './config/filters';
import { TransactionTypeValue } from '../../types/config';
import { plpUrlPathParamsSelector } from './match';
import { filterParamsCombiner } from './config/range-filters';

export interface ButtonInfo {
  readonly text: string;
  readonly url: string;
  readonly visible: boolean;
}

export const buyButtonTextSelector = createSelector(
  hideBuyButtonSelector,
  intlSelector,
  (hideBuyButton, intl) =>
    hideBuyButton
      ? intl.formatMessage({ id: 'GenericSearchButton' })
      : intl.formatMessage({ id: 'SearchToBuyButton' })
);

export const letButtonTextSelector = createSelector(
  hideBuyButtonSelector,
  intlSelector,
  (hideBuyButton, intl) =>
    hideBuyButton
      ? intl.formatMessage({ id: 'GenericSearchButton' })
      : intl.formatMessage({ id: 'SearchToLetButton' })
);

export const displaySearchPathSelectorSelector = createSelector(
  configSelector,
  config =>
    config.searchConfig.searchPathSelector && config.searchConfig.searchPathSelector.length > 0
);

const defaultSearchPathValueSelector = createSelector(
  configSearchPathSelectorSelector,
  searchPaths => {
    if (!searchPaths || !searchPaths.length) {
      return undefined;
    }

    const defaultSearchPath = searchPaths.find(sp => sp.default);

    if (!defaultSearchPath) {
      throw new Error('If searchPaths are present there must always be a default one');
    }

    return defaultSearchPath.value;
  }
);

export const searchPathSelector = createSelector(
  uiSearchPathSelector,
  defaultSearchPathValueSelector,
  (uiSearchPath, defaultSearchPath) => uiSearchPath || defaultSearchPath
);

export const plpPathSelector = createSelector(
  searchPathSelector,
  searchResultsPageSelector,
  (searchPath, searchResultsPage) => {
    if (!searchPath && !searchResultsPage) {
      throw new Error('SearchPath of search');
    }

    return searchPath || searchResultsPage;
  }
);

const filtersParamsSelector = createSelector(
  selectedFiltersSelector,
  defaultFiltersParamsSelectors,
  (selectedFilters, defaultFilters) => ({ ...defaultFilters, ...selectedFilters })
);

export const v1FilterParamsSelector = createSelector(
  filtersParamsSelector,
  filtersSelector,
  () => true,
  () => false,
  filterParamsCombiner
);

const uiSearchParamsSelector = createSelector(selectedSuggestionSelector, suggestion =>
  !!suggestion ? { placeId: suggestion.placeId, location: suggestion.description } : {}
);

const searchParamsSelector = createSelector(
  v1FilterParamsSelector,
  uiSearchParamsSelector,
  (filterParams, uiParams) => ({ ...filterParams, ...uiParams })
);

export const searchLinkSelector = (linkType: TransactionTypeValue) =>
  createSelector(
    plpPathSelector,
    searchParamsSelector,
    selectedSuggestionSelector,
    (plpPath, params, suggestion) => {
      const newParams = {
        ...params,
        aspects: linkType,
      };

      // TODO: this needs to be moved into state and a selector created to retrieve it
      // also a non null assertion operator added and tested
      // TODO: do we really want to add /details here?
      if (suggestion !== undefined && suggestion!.propertyResult !== undefined) {
        if (suggestion.propertyResult!.propertyPartialPath !== undefined) {
          return `${suggestion.propertyResult!.searchPath}/details/${
            suggestion.propertyResult!.propertyPartialPath
          }?view=${linkType}`;
        }
      }

      return `${plpPath}?${stringify(newParams)}`;
    }
  );

export const buyButtonInfoSelector = createSelector(
  buyButtonTextSelector,
  searchLinkSelector(TransactionTypeValue.isSale),
  hideBuyButtonSelector,
  selectedSuggestionSelector,
  (text, url, hide, suggestion): ButtonInfo => {
    const toShow =
      suggestion !== undefined &&
      suggestion!.propertyResult !== undefined &&
      suggestion!.propertyResult!.propertyAspects !== undefined
        ? suggestion!.propertyResult!.propertyAspects!.includes('isSale')
        : !hide;
    return {
      text,
      url,
      visible: toShow,
    };
  }
);

export const letButtonInfoSelector = createSelector(
  letButtonTextSelector,
  searchLinkSelector(TransactionTypeValue.isLetting),
  hideLetButtonSelector,
  selectedSuggestionSelector,
  (text, url, hide, suggestion): ButtonInfo => {
    const toShow =
      suggestion !== undefined &&
      suggestion!.propertyResult !== undefined &&
      suggestion!.propertyResult!.propertyAspects !== undefined
        ? suggestion!.propertyResult!.propertyAspects!.includes('isLetting')
        : !hide;
    return {
      text,
      url,
      visible: toShow,
    };
  }
);

export interface AutocompleteSuggestion {
  readonly label: string;
  readonly value: string;
  readonly default: boolean;
}

export const locationLookupSuggestionsSelector = createSelector(
  suggestionsSelector,
  (suggestions): AutocompleteSuggestion[] =>
    suggestions.map(suggestion => ({
      label: suggestion.description,
      value: suggestion.placeId,
      default: false,
    }))
);

export const initialSearchLocationSelector = createSelector(
  plpUrlPathParamsSelector,
  ({ location }) => location
);
