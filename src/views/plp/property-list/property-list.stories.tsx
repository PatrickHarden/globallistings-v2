import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PropertyList } from './property-list';
import { FilterType, FilterPlacement, FilterModifier } from '../../../types/config';
import { SelectFilterInfo } from '../../../redux/selectors/config/filters';

const properties = Array(10).map(n => ({
  address: '88 Londond Wall, EC2R 5BT',
  imgUrl: 'https://images.unsplash.com/photo-1485181044355-5b94cc167214',
  price: '£42.50/sqft/pa',
  size: '3,102sqft - 8,102sqft',
  id: n.toString(),
  location: { lat: 1.123, lon: 1.123 },
  selected: false,
}));

const sortFilter: SelectFilterInfo = {
  name: 'sort',
  placement: FilterPlacement.primary,
  type: FilterType.select,
  label: 'Sort',
  items: [],
  modifier: FilterModifier.query,
};

const onFilterChange = (key: string) => (c: string) => action('Is selected:');
const goToProperty = (id: string) => (c: string) => action('Is Clicked:');
const onListPropertyEnter = (id: string) => (c: string) => action('Mouseover:');
const onListPropertyLeave = (id: string) => (c: string) => action('Mouseout:');

const props = {
  goToProperty,
  onFilterChange,
  onListPropertyEnter,
  onListPropertyLeave,
  resultCount: '2 matching offices for rent',
};

storiesOf('Property List', module)
  .add('Primary style', () => <PropertyList properties={properties} filters={[]} {...props} />)
  .add('Withsort filter', () => (
    <PropertyList properties={properties} filters={[sortFilter]} {...props} />
  ));
