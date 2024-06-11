import React from 'react';
import { shallow } from 'enzyme';

import LinkButton from '../link-button';
import { ArrowRight } from '../../icons/arrow-right';

describe('components', () => {
  describe('link-button', () => {
    const props = {
      href: 'http://www.google.com',
    };

    it('should render correctly', () => {
      expect(shallow(<LinkButton {...props} />)).toMatchSnapshot();
    });

    it('should render correctly with an icon', () => {
      expect(shallow(<LinkButton {...props} icon={<ArrowRight />} />)).toMatchSnapshot();
    });
  });
});
