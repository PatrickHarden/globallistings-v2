import React from 'react';
import { shallow } from 'enzyme';

import SearchHeader from '../search-header';

describe('components/SearchComponents', () => {
  describe('SearchHeader', () => {
    it('should render correctly', () => {
      const props = {
        searchHeaderLinkText: 'Go to CBRE',
        searchHeaderLinkUrl: 'https://www.cbre.com',
        searchHeaderTitleText: 'Search Header',
      };
      expect(shallow(<SearchHeader {...props} />)).toMatchSnapshot();
    });

    it('should render correctly with no props', () => {
      expect(shallow(<SearchHeader />)).toMatchSnapshot();
    });

    it('should render correctly with no link', () => {
      expect(shallow(<SearchHeader searchHeaderTitleText="Search Header" />)).toMatchSnapshot();
    });
  });
});
