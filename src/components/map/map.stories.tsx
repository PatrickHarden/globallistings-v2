import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PropertyOverview } from '../../redux/selectors/property-search-results';
import { Area } from '../../redux/selectors/area';
import { DeepPartial } from '../../types/common/deep-partial';
import { Location } from '../../types/property';

import Map from './map';

const properties: Array<DeepPartial<PropertyOverview>> = [
  { id: 'p1', location: { lat: 51.507, lon: 0.1278 } },
  { id: 'p2', location: { lat: 53.4808, lon: 2.2426 } },
  { id: 'p3', location: { lat: 55.9533, lon: 3.1883 } },
];

const area: Area = {
  type: 'circle',
  center: {
    lat: 1,
    lng: 2,
  },
  bounds: {
    ne: {
      lat: 1,
      lng: 2,
    },
    sw: {
      lat: 2,
      lng: 2,
    },
  },
  radius: 5,
};

const point: Location = {
  lat: 51.507,
  lon: 0.1278,
};

storiesOf('Map', module)
  .add('Without property', () => <Map properties={[]} area={area} />)
  .add('With single property', () => (
    <Map properties={[properties[0] as PropertyOverview]} point={point} />
  ))
  .add('With few Properties', () => (
    <Map
      properties={properties as PropertyOverview[]}
      area={area}
      onPinClicked={action('pin clicked')}
    />
  ));
