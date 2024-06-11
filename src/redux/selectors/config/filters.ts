import { filtersSelector } from '../state';
import { createSelector } from 'reselect';

import { querySelector, locationParamsSelector } from '../location';
import { FilterOption, FilterType, BaseFilter } from '../../../types/config';
import { Dictionary } from '../../../types/common/dictionary';

export interface SelectInfo {
  readonly items: FilterOption[];
  readonly selectedItem?: FilterOption;
}

export interface SelectFilterInfo extends BaseFilter, SelectInfo {
  readonly type: FilterType.select;
}

export interface RangeFilterInfo extends BaseFilter {
  readonly type: FilterType.range;
  readonly min: SelectInfo;
  readonly max: SelectInfo;
}

export type FilterInfo = SelectFilterInfo | RangeFilterInfo;

const getValidRangeOptions = (
  options: FilterOption[],
  selectedOption: FilterOption | undefined,
  comparator: (a: number, b: number) => boolean
) => {
  if (!selectedOption) {
    return options;
  }

  return options.filter(({ value }) => {
    // Allow default values
    if (value === '') {
      return true;
    }
    const a = parseInt(value, undefined);
    const b = parseInt(selectedOption.value, undefined);
    if (isNaN(a) || isNaN(b)) {
      console.warn(
        `${value} cannot be parsed to a valid integer therefore disabling of invalid range filter values will not work.`
      );
      return true;
    }
    return comparator(a, b);
  });
};

const filterOptionToQueryValue = (filterName: string, query: any) => (f: FilterOption) =>
  f.value === query[`${filterName}_${f.type}`];

const findQueryValue = (filterName: string, query: any, key: string) => {
  const keyObj = query[key];
  return keyObj !== undefined ? keyObj[filterName] : query[filterName];
};

export const filtersInfoSelector = createSelector(
  filtersSelector,
  locationParamsSelector,
  (filters, query): FilterInfo[] =>
    filters
      .filter(f => [FilterType.range, FilterType.select].indexOf(f.type) > -1)
      .map(f => {
        const queryValue = findQueryValue(f.name, query, 'params');
        if (Array.isArray(queryValue)) {
          throw new Error(`query param ${queryValue} must not be an array`);
        }

        if (f.type === FilterType.select) {
          const value = f.options.find(o => o.value === queryValue);
          return {
            ...f,
            items: f.options,
            selectedItem: value,
          };
        }
        if (f.type === FilterType.range) {
          const minValue = f.minValues.find(filterOptionToQueryValue(f.name, query));
          const maxValue = f.maxValues.find(filterOptionToQueryValue(f.name, query));
          const minValues = getValidRangeOptions(f.minValues, maxValue, (a, b) => a <= b);
          const maxValues = getValidRangeOptions(f.maxValues, minValue, (a, b) => a >= b);

          return {
            range: FilterType.range,
            type: f.type,
            placement: f.placement,
            label: f.label,
            name: f.name,
            modifier: f.modifier,
            min: {
              items: minValues,
              selectedItem: minValue,
            },
            max: {
              items: maxValues,
              selectedItem: maxValue,
            },
          };
        }

        throw new Error('Unsupported filter type');
      })
);

export const defaultFiltersParamsSelectors = createSelector(
  filtersSelector,
  (filters): Dictionary<string> =>
    filters
      .map(f => {
        if (f.type === FilterType.select) {
          const defaultOption = f.options.find(o => o.default);
          if (!defaultOption) {
            return {};
          }
          return { [f.name]: defaultOption.value };
        }
        // TODO add support for range filters
        return {};
      })
      .reduce((prev, curr) => ({ ...prev, ...curr }), {})
);
