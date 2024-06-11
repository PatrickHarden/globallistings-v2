import React from 'react';
import { storiesOf } from '@storybook/react';
import { FilterBar } from './filter-bar';
import { FilterType, FilterPlacement, FilterModifier } from '../../../types/config';
import { RangeFilterInfo, SelectFilterInfo } from '../../../redux/selectors/config/filters';

const rangeFilter: RangeFilterInfo = {
  name: 'Dynamic.LettingCharge',
  placement: FilterPlacement.primary,
  type: FilterType.range,
  label: 'Rent',
  min: { items: [] },
  max: { items: [] },
  modifier: FilterModifier.query,
};

const selectFilter: SelectFilterInfo = {
  name: 'radius',
  placement: FilterPlacement.primary,
  type: FilterType.select,
  label: 'Radius',
  items: [],
  modifier: FilterModifier.query,
};

const filterChange = (key: string) => (c: string) => console.log(`${c} is selected`);
const onLocationChange = (c: string) => console.log(`${c} is selected`);

storiesOf('FilterBar', module)
  .add('Without Filters', () => (
    <FilterBar
      filters={[]}
      onFilterChange={filterChange}
      onLocationChange={onLocationChange}
      suggestions={[]}
      changePlaceSearch={filterChange}
    />
  ))
  .add('With One Range filter', () => (
    <FilterBar
      filters={[rangeFilter]}
      onFilterChange={filterChange}
      onLocationChange={onLocationChange}
      suggestions={[]}
      changePlaceSearch={filterChange}
    />
  ))
  .add('With Range and Select filter', () => (
    <FilterBar
      filters={[rangeFilter, selectFilter]}
      onFilterChange={filterChange}
      onLocationChange={onLocationChange}
      suggestions={[]}
      changePlaceSearch={filterChange}
    />
  ));
