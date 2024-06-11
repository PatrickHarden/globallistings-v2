import React from 'react';
import { storiesOf } from '@storybook/react';
import { PropertyCard } from './property-card';

storiesOf('Property Card', module)
  .add('Primary style', () => (
    <PropertyCard
      address={'88 Londond Wall, EC2R 5BT'}
      imgUrl={'https://images.unsplash.com/photo-1485181044355-5b94cc167214'}
      price={'£42.50/sqft/pa'}
      size={'3,102sqft - 8,102sqft'}
      id={'1'}
      location={{ lat: 1.123, lon: 1.123 }}
      selected={false}
    />
  ))
  .add('With click event', () => (
    <PropertyCard
      address={'88 Londond Wall, EC2R 5BT'}
      imgUrl={'https://images.unsplash.com/photo-1485181044355-5b94cc167214'}
      price={'£42.50/sqft/pa'}
      size={'3,102sqft - 8,102sqft'}
      id={'1'}
      location={{ lat: 1.123, lon: 1.123 }}
      handleClick={(id: string) => console.log(`property ${id} clicked`)}
      selected={false}
    />
  ));
