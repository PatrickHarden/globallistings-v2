import React from 'react';
import { shallow } from 'enzyme';

import StringHighlighter from '../string-highlighter';
import { ArrowRight } from '../../icons/arrow-right';

describe('components', () => {
  describe('string-highlighter', () => {
    const props = {
      enabled: true,
      highlightSection: 'a str',
      str: 'This is a string',
    };

    it('should render correctly', () => {
      expect(shallow(<StringHighlighter {...props} />)).toMatchSnapshot();
    });

    it('should render correctly when there is no match', () => {
      expect(shallow(<StringHighlighter {...props} highlightSection="foo" />)).toMatchSnapshot();
    });

    it('should render correctly with a custom element', () => {
      expect(shallow(<StringHighlighter {...props} highlightComponent="span" />)).toMatchSnapshot();
    });

    it('should render correctly with a custom class', () => {
      expect(shallow(<StringHighlighter {...props} highlightClass="a-class" />)).toMatchSnapshot();
    });

    it('should render correctly when disabled', () => {
      expect(shallow(<StringHighlighter {...props} enabled={false} />)).toMatchSnapshot();
    });
  });
});
