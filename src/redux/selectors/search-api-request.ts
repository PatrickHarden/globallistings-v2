// @ts-nocheck
import { PlpQuery, TransactionType } from '../../types/plp';
import { createSelector } from 'reselect';
import renameKeys from '../../utils/renameKeys';
import { paramsSelector } from './config/config';
import { querySelector, plpTransactionTypeSelector } from './location';
import { configSelector, filtersSelector } from './state';
import { boundsToSquare } from '../../utils/boundsToSquare';
import { areaSelector } from './area';
import { TransactionTypeValue } from '../../types/config';
import { filter, is, Dictionary } from 'ramda';
import { filterParamsCombiner } from './config/range-filters';

const QueryToApiRequestParamsMapping: { [P in keyof PlpQuery]?: string } = {
  sort: 'Sort',
};

const SelectProperties =
  'Dynamic.PrimaryImage,Common.ActualAddress,Common.Charges,Common.NumberOfBedrooms,Common.PrimaryKey,Common.Coordinate,Common.Aspects,Common.ListingCount,Common.IsParent,Common.ContactGroup,Common.Highlights,Common.Walkthrough,Common.MinimumSize,Common.MaximumSize,Common.TotalSize,Common.GeoLocation,Common.Sizes';

const mappedApiRequestQuery = createSelector(querySelector, query =>
  renameKeys(QueryToApiRequestParamsMapping, query)
);

const locationParamsSelector = createSelector(areaSelector, area => {
  switch (area.type) {
    case 'circle':
      return {
        radius: area.radius.toString(),
        Lat: area.center.lat,
        Lon: area.center.lng,
      };
    case 'rectangle':
      return {
        PolygonFilters: JSON.stringify([boundsToSquare(area.bounds)]),
      };
  }
});

export const paginationSelector = createSelector(configSelector, config => ({
  PageSize: config.limitListMapResults ? Number(config.limitListMapResults) : undefined,
  Page: 1, // TODO: Hook up to pagination functionality
}));

const transactionTypeMapping: { [K in TransactionType]: TransactionTypeValue | undefined } = {
  sale: TransactionTypeValue.isSale,
  letting: TransactionTypeValue.isLetting,
};

export const transactionTypeParamsSelector = createSelector(
  plpTransactionTypeSelector,
  transactionType => {
    const result = transactionTypeMapping[transactionType];
    if (!result) {
      throw new Error(`${transactionType} is not a supported transaction type`);
    }

    return { 'Common.Aspects': result };
  }
);

// NOTE: we have to cast to the dictionary, as the typing can't infer that undefined will be filters out with is(String)
const queryParamsSelector = createSelector(
  querySelector,
  query => filter(is(String), query) as Dictionary<string>
);

const rangeFilterParamsSelector = createSelector(
  queryParamsSelector,
  filtersSelector,
  filterParamsCombiner
);

export const propertiesSearchRequestQuerySelector = createSelector(
  mappedApiRequestQuery,
  locationParamsSelector,
  paramsSelector,
  paginationSelector,
  transactionTypeParamsSelector,
  rangeFilterParamsSelector,
  (query, locationParams, defaultParams, pagination, transactionTypeParams, rangeFilterParams) => ({
    ...pagination,
    ...defaultParams,
    ...locationParams,
    ...query,
    ...transactionTypeParams,
    ...rangeFilterParams,
    // _select: SelectProperties,
  })
);

export const propertySearchRequestQuerySelector = createSelector(paramsSelector, defaultParams => ({
  ...defaultParams,
  _select: SelectProperties,
}));
