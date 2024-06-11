import React from 'react';
import { shallow } from 'enzyme';

import { FilterType, FilterPlacement } from '../../../../types/config';

import SearchFilters from '../search-filters';
import { RangeFilterInfo, SelectFilterInfo } from '../../../../redux/selectors/config/filters';

describe('views/search', () => {
  describe('search-filters', () => {
    const selectFilter: SelectFilterInfo = {
      name: 'selectFilter',
      label: 'select filter',
      type: FilterType.select,
      items: [],
      placement: FilterPlacement.primary, // irrelevant in this suite
    };

    const rangeFilter: RangeFilterInfo = {
      name: 'rangeFilter',
      label: 'range filter',
      type: FilterType.range,
      min: {
        items: [],
      },
      max: {
        items: [],
      },
      placement: FilterPlacement.primary, // irrelevant in this suite
    };

    const props = {
      handleChange: (res: any) => res,
      params: {},
    };

    it('should render correctly', () => {
      expect(
        shallow(<SearchFilters {...props} primaryFilters={[]} secondaryFilters={[]} />)
      ).toMatchSnapshot();
    });

    it('should render correctly with primary filters', () => {
      expect(
        shallow(
          <SearchFilters
            {...props}
            primaryFilters={[selectFilter, rangeFilter]}
            secondaryFilters={[]}
          />
        )
      ).toMatchSnapshot();
    });

    it('should render correctly with secondary filters', () => {
      expect(
        shallow(
          <SearchFilters
            {...props}
            secondaryFilters={[rangeFilter, selectFilter]}
            primaryFilters={[]}
          />
        )
      ).toMatchSnapshot();
    });

    it('should render correctly with both primary and secondary filters', () => {
      expect(
        shallow(
          <SearchFilters
            {...props}
            primaryFilters={[selectFilter, rangeFilter]}
            secondaryFilters={[rangeFilter, selectFilter]}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
