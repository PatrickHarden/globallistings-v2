import React from 'react';
import { shallow } from 'enzyme';
import { FilterType, FilterPlacement, FilterModifier } from '../../../types/config';
import { Filters } from '../filters';
import { SelectFilterInfo, RangeFilterInfo } from '../../../redux/selectors/config/filters';

describe(Filters, () => {
  const props = {
    displayLabels: false,
    handleChange: jest.fn(),
    inline: false,
    filters: [],
  };

  const getSelectFilter = (name: string): SelectFilterInfo => ({
    name,
    label: 'select filter',
    type: FilterType.select,
    items: [{ value: 'foo', label: 'bar', default: false }],
    placement: FilterPlacement.primary,
    modifier: FilterModifier.query,
  });

  const getRangeFilter = (name: string): RangeFilterInfo => ({
    name,
    label: 'select filter',
    type: FilterType.range,
    min: { items: [] },
    max: { items: [] },
    placement: FilterPlacement.secondary,
    modifier: FilterModifier.query,
  });

  it('should render correctly', () => {
    expect(shallow(<Filters {...props} />)).toMatchSnapshot();
  });

  it('should render correctly with filters', () => {
    expect(
      shallow(<Filters {...props} filters={[getSelectFilter('select'), getRangeFilter('range')]} />)
    ).toMatchSnapshot();
  });

  it('should render correctly with filter labels', () => {
    expect(
      shallow(
        <Filters
          {...props}
          displayLabels={true}
          filters={[getSelectFilter('select'), getRangeFilter('range')]}
        />
      )
    ).toMatchSnapshot();
  });

  it('should render correctly with a placement specified', () => {
    expect(
      shallow(
        <Filters
          {...props}
          displayLabels={true}
          filters={[getSelectFilter('select'), getRangeFilter('range')]}
          placement={FilterPlacement.primary}
        />
      )
    ).toMatchSnapshot();
  });
});
