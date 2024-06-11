import { createSelector } from 'reselect';

import { propertiesSearchRequestQuerySelector } from './search-api-request';
import { filtersInfoSelector, FilterInfo } from './config/filters';

export const conditionalFiltersSelector = createSelector(
  filtersInfoSelector,
  propertiesSearchRequestQuerySelector,
  (filters, query): FilterInfo[] =>
    filters.filter(({ conditional = {} }: FilterInfo) =>
      Object.keys(conditional).every(key => query[key] === conditional[key])
    )
);

export const primaryFiltersSelector = createSelector(
  filtersInfoSelector,
  filters => filters.filter(f => f.placement === 'primary')
);

export const secondaryFiltersSelector = createSelector(
  filtersInfoSelector,
  filters => filters.filter(f => f.placement === 'secondary')
);
