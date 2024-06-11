import { createSelector } from 'reselect';
import { configSelector, configMetaSelector } from '../state';

export const configStatusSelector = createSelector(
  configMetaSelector,
  config => config.status
);

export const getFilters = createSelector(
  configSelector,
  config => config.filters
);

export const siteTypeSelector = createSelector(
  configSelector,
  config => config.siteType
);
export const searchModeSelector = createSelector(
  configSelector,
  config => config.searchMode
);

// SearchConfig
export const searchConfigSelector = createSelector(
  configSelector,
  config => config.searchConfig
);

export const searchBiasSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.searchBias
);

export const searchRadiusRestrictionSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.biasRadius
);

export const searchCountryRestrictionSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.restrictToCountry
);

export const polygonSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.polygons
);

export const searchTypesRestrictionSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.searchPlaceTypes
);

export const assumeZipCodeSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.allowAssumeZipCode
);

export const searchPathSortAlphabeticalSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.searchPathSortAlphabetical
);

export const searchPathSelectorSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.searchPathSelector
);

export const propertyIdPathSelectorSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.propertyIdSearchPathSelector
);

export const hideBuyButtonSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.hideSearchToBuy
);

export const hideLetButtonSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.hideSearchToLet
);

export const getSearchHeader = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.searchHeader
);
export const searchResultsPageSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.searchResultsPage
);

export const searchSuggestDebounceSelector = createSelector(
  searchConfigSelector,
  searchConfig => searchConfig.searchSuggestDebounce
);

export const defaultSearchLocationNameSelector = createSelector(
  configSelector,
  config => config.searchLocationName
);

export const paramsSelector = createSelector(
  configSelector,
  config => config.params
);

export const restrictionsSelector = createSelector(
  configSelector,
  config => ({
    country: config.searchConfig.restrictToCountry,
  })
);

export const otherConfigsSelector = createSelector(
  configSelector,
  config => (config.otherConfigs ? config.otherConfigs : [])
);

export const currentConfigSelector = createSelector(
  configSelector,
  config => config.currentConfig
);
