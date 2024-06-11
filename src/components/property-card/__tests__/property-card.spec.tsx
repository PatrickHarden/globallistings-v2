import React from 'react';
import { shallow } from 'enzyme';

import { PropertyCard } from '../property-card';

describe(PropertyCard, () => {
  const props = {
    address: '1 Any Road, Any WHere',
    id: 'abc123',
    imgUrl: '/img',
    location: { lat: 0, lon: 0 },
    price: '£100',
    size: 'Massive',
    selected: false,
  };

  it('should render correctly', () => {
    expect(shallow(<PropertyCard {...props} />)).toMatchSnapshot();
  });

  it('should render correctly with a click event', () => {
    expect(shallow(<PropertyCard {...props} handleClick={id => id} />)).toMatchSnapshot();
  });
});
