// @ts-nocheck
import {
  mergeAll,
  chain,
  prop,
  not,
  isNil,
  assocPath,
  mergeDeepRight,
  test,
  keys,
  filter,
  compose,
  map,
  reduce,
} from 'ramda';

import { Maybe } from '../../../types/common/maybe';
import { Dictionary } from '../../../types/common/dictionary';
import { RangeFilter, FilterType, Filter } from '../../../types/config';
import { splitObjectBy } from '../../../utils/split-object-by';

const isMinFilterTest = /(_min)$/gi;
const isMaxFilterTest = /(_max)$/gi;

export const isRangeFilter = (filterName: string) =>
  test(isMinFilterTest, filterName) || test(isMaxFilterTest, filterName);

const rangeKeysObjPred = (_: string, key: string) => isRangeFilter(key);

const buildRangeValue = (min: Maybe<string> = '', max: Maybe<string> = '', includePOA?: boolean) =>
  min !== '' || max !== ''
    ? `range[${min}|${max}|${includePOA ? 'include' : 'exclude'}]`
    : undefined;

/**
 *
 * @param rangeFilterName a filter name in a format of `price_min` or `price_max`
 */
const splitRangeFilterName = (rangeFilterName: string) => ({
  name: rangeFilterName.slice(0, -4),
  type: rangeFilterName.slice(rangeFilterName.length - 3, rangeFilterName.length),
});

type RangeFilterParam = Dictionary<{ min: string; max: string }>;

const getDefaultRangeFilterParams = (filters: RangeFilter[]) =>
  compose(
    mergeAll as any,
    chain((f: RangeFilter): RangeFilterParam[] =>
      f.name.split('|').map(filterName => ({
        [filterName]: {
          min: prop('value', f.minValues.find(minFilter => minFilter.default)!),
          max: prop('value', f.maxValues.find(maxFilter => maxFilter.default)!),
        },
      }))
    )
  )(filters);

const getFilter = (rangeFilter: RangeFilter[], filterName: string): Maybe<RangeFilter> =>
  rangeFilter.find(f => f.name.includes(filterName) && f.type === FilterType.range);

const notNil = compose(not, isNil);

const mergeAllDeepRight = reduce(mergeDeepRight, {});

const filterNameToParam = (rangeFilterParams: RangeFilterParam, rangeFilters: RangeFilter[]) => (
  filterName: string
) => {
  const range = rangeFilterParams[filterName]!;
  const correspondingFilter = getFilter(rangeFilters, filterName);

  if (!correspondingFilter) {
    throw new Error('Cannot perform range value conversion on a non range filter');
  }

  const multiFilterParams = correspondingFilter.name.split('|');
  let rangeValue;

  if (multiFilterParams.length === 1) {
    rangeValue = buildRangeValue(range.min, range.max, correspondingFilter.includePOA);
  } else {
    if (filterName === multiFilterParams[0]) {
      rangeValue = buildRangeValue(undefined, range.max, correspondingFilter.includePOA);
    }
    if (filterName === multiFilterParams[1]) {
      rangeValue = buildRangeValue(range.min, undefined, correspondingFilter.includePOA);
    }
  }

  return rangeValue
    ? {
        [filterName]: rangeValue,
      }
    : undefined;
};

export const filterParamsCombiner = (
  params: Dictionary<string>,
  filters: Filter[],
  passThroughOtherParams: boolean = false,
  passDefaultParams: boolean = true
) => {
  const [rangeParams, otherParams] = compose(
    splitObjectBy(rangeKeysObjPred),
    filter(notNil)
  )(params);

  const rangeFilters = filter(f => f.type === FilterType.range, filters) as RangeFilter[];

  const selectedFilters = compose(
    mergeAllDeepRight,
    chain((rangeParamKey: string) => {
      const value = rangeParams[rangeParamKey]!;
      const { name, type } = splitRangeFilterName(rangeParamKey);
      return name.split('|').map(newName => assocPath([newName, type], value, {}));
    }),
    keys
  )(rangeParams);

  const mergeRangeParams = mergeDeepRight(
    passDefaultParams ? getDefaultRangeFilterParams(rangeFilters) : () => ({}),
    selectedFilters
  );

  const rangeFilterParams = compose(
    mergeAll as any,
    map(filterNameToParam(mergeRangeParams as any, rangeFilters)),
    keys
  )(mergeRangeParams);

  if (passThroughOtherParams) {
    return mergeDeepRight(otherParams, rangeFilterParams);
  }

  return rangeFilterParams;
};
