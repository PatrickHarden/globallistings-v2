import React from 'react';
import { shallow } from 'enzyme';

import { FilterSelectItem } from '../../../types/ui';
import MapSearch from '../map-search';

describe('components', () => {
  describe('map-search', () => {
    const props = {
      initialSearchLocation: 'initialSearchLocation',
      placeholder: 'placeholder',
      suggestions: [{ label: 'foo', value: 'bar' }],
      handleSelect: (selection: FilterSelectItem) => selection,
      handleInput: (searchTerm: string) => searchTerm,
    };

    it('should render correctly', () => {
      expect(shallow(<MapSearch {...props} />)).toMatchSnapshot();
    });
  });
});
