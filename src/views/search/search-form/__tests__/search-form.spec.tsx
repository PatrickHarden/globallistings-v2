import React from 'react';
import { shallow } from 'enzyme';

import { FilterSelectItem } from '../../../../types/ui';

import SearchForm from '../search-form';

describe('views/search', () => {
  describe('search-form', () => {
    const buyButtonInfo = {
      url: '/buyButtonInfo',
      text: 'buyButtonInfo',
      visible: true,
    };

    const letButtonInfo = {
      url: '/letButtonInfo',
      text: 'letButtonInfo',
      visible: true,
    };

    const props = {
      biasRadius: 10,
      buyButtonInfo,
      buyLink: '/buyLink',
      language: {
        SearchLocationPlaceholder: 'SearchLocationPlaceholder',
      },
      letButtonInfo,
      letLink: 'letLink',
      locationTypeDefinitions: [],
      resetSearchLocation: () => '¯_(ツ)_/¯',
      restrictToCountry: 'uk',
      searchBias: {
        lat: '51.48',
        lon: '0',
      },
      setSearchLocation: (searchLocation: FilterSelectItem) => searchLocation,
      suggestions: [{ value: 'foo', label: 'bar', params: {} }],
      updateSearchPath: (searchPath: FilterSelectItem) => searchPath,
      changePlaceSearch: (place: string) => place,
    };

    const searchPathSelectors = [
      {
        value: '/listmap/office',
        label: 'Offices in',
        default: false,
      },
      {
        value: '/listmap/industrial',
        label: 'Industrial in',
        default: true,
      },
    ];

    it('should render correctly', () => {
      expect(shallow(<SearchForm {...props} />)).toMatchSnapshot();
    });

    it('should render correctly with hidden buy button', () => {
      expect(
        shallow(<SearchForm {...props} buyButtonInfo={{ ...buyButtonInfo, visible: false }} />)
      ).toMatchSnapshot();
    });

    it('should render correctly with hidden let button', () => {
      expect(
        shallow(<SearchForm {...props} letButtonInfo={{ ...letButtonInfo, visible: false }} />)
      ).toMatchSnapshot();
    });

    it('should render correctly with searchPathSelectors', () => {
      const testProps = {
        ...props,
        searchPathSelectors,
      };
      expect(shallow(<SearchForm {...testProps} />)).toMatchSnapshot();
    });

    it('should render correctly with searchPathSelectors and searchPath set', () => {
      const testProps = {
        ...props,
        searchPathSelectors,
        searchPath: '/listmap/industrial',
      };
      expect(shallow(<SearchForm {...testProps} />)).toMatchSnapshot();
    });
  });
});
