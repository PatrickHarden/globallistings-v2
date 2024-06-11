import React from 'react';
import { shallow } from 'enzyme';

import { SearchContainer } from '../search-container';

describe(SearchContainer, () => {
  describe('should call render complete', () => {
    it('should render correctly and call action on mount', () => {
      const props = {
        renderComplete: jest.fn(),
        foo: 'bar',
      };
      shallow(<SearchContainer {...props as any} />);

      expect(props.renderComplete).toHaveBeenCalled();
    });
  });
});
