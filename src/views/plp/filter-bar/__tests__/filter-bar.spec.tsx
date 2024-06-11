import React from 'react';
import { shallow } from 'enzyme';

import { FilterType, FilterPlacement, FilterModifier } from '../../../../types/config';
import { FilterBar } from '../filter-bar';
import { FilterInfo } from '../../../../redux/selectors/config/filters';

describe(FilterBar, () => {
  const filters: FilterInfo[] = [
    {
      name,
      label: 'select filter',
      type: FilterType.select,
      items: [{ value: 'foo', label: 'bar', default: false }],
      placement: FilterPlacement.primary,
      modifier: FilterModifier.query,
    },
    {
      name,
      label: 'Ramge filter',
      type: FilterType.range,
      min: { items: [] },
      max: { items: [] },
      placement: FilterPlacement.secondary,
      modifier: FilterModifier.query,
    },
  ];
  const props = {
    filters,
    changePlaceSearch: (searchTerm: string) => searchTerm,
    onLocationChange: (searchTerm: string) => searchTerm,
    onFilterChange: (key: string) => (val: string, modifier: FilterModifier) => ({ val, modifier }),
    suggestions: [{ label: 'London', value: 'abc123', default: false }],
    initialSearchLocation: 'London',
  };

  it('should render correctly', () => {
    expect(shallow(<FilterBar {...props} />)).toMatchSnapshot();
  });
});
