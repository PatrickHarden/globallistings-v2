import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../../themes/default/theme';
import Select, { InputWrapper } from '../select';
import { MagnifyingGlass } from '../../icons/magnifying-glass';

describe('components/SharedComponents', () => {
  describe('select', () => {
    let props: any;

    beforeEach(() => {
      props = {
        theme,
        items: [
          { value: 'foo', label: 'bar', default: false },
          { value: 'bar', label: 'baz', default: false },
        ],
        handleInput: jest.fn(),
        handleSelect: jest.fn(),
      };
    });

    it('should render correctly with default props', () => {
      expect(shallow(<Select {...props} />).dive()).toMatchSnapshot();
    });

    it('should render correctly with an icon', () => {
      expect(shallow(<Select {...props} icon={<MagnifyingGlass />} />).dive()).toMatchSnapshot();
    });

    it('should render correctly with a label', () => {
      expect(shallow(<Select {...props} labelText="A label" />).dive()).toMatchSnapshot();
    });

    it('should render correctly with a placeholder', () => {
      expect(shallow(<Select {...props} placeholder="A placeholder" />).dive()).toMatchSnapshot();
    });

    it('should render correctly as an autocomplete', () => {
      expect(shallow(<Select {...props} autocomplete={true} />).dive()).toMatchSnapshot();
    });

    it('should render correctly with an initial value', () => {
      expect(
        shallow(<Select {...props} initialInputValue="An initial value" />).dive()
      ).toMatchSnapshot();
    });

    it('should render correctly when defaultToFirstValue is true', () => {
      expect(shallow(<Select {...props} defaultToFirstValue={true} />).dive()).toMatchSnapshot();
    });

    it('should render correctly with a default value', () => {
      props.items[1].default = true;
      expect(shallow(<Select {...props} />).dive()).toMatchSnapshot();
    });

    it('should render correctly with a selected item', () => {
      expect(
        shallow(<Select {...props} selectedItem={{ value: 'foo', label: 'bar' }} />).dive()
      ).toMatchSnapshot();
    });

    it('should render correctly when options are displayed', () => {
      const component = mount(
        <ThemeProvider theme={theme}>
          <Select {...props} />
        </ThemeProvider>
      );
      component.find(InputWrapper).simulate('click');
      expect(component).toMatchSnapshot();
    });

    it('should render correctly when options are displayed and highlightCurrentValue is true', () => {
      const component = mount(
        <ThemeProvider theme={theme}>
          <Select {...props} highlightCurrentValue={true} />
        </ThemeProvider>
      );
      component.find('input').simulate('change', { target: { value: 'ba' } });
      expect(component).toMatchSnapshot();
    });

    it('should fire the correct action when the input is updated', () => {
      const component = mount(
        <ThemeProvider theme={theme}>
          <Select {...props} />
        </ThemeProvider>
      );
      component.find('input').simulate('change', { target: { value: 'foo' } });
      expect(props.handleInput).toHaveBeenCalledWith('foo');
    });

    it('should fire the correct action when an item is selected', () => {
      const component = mount(
        <ThemeProvider theme={theme}>
          <Select {...props} />
        </ThemeProvider>
      );
      component.find('input').simulate('change', { target: { value: 'foo' } });
      component
        .find('button')
        .at(0)
        .simulate('click');
      expect(props.handleSelect).toHaveBeenCalledWith(props.items[0], jasmine.any(Object));
    });

    it('should render correctly when textEditable is false', () => {
      expect(shallow(<Select {...props} textEditable={false} />).dive()).toMatchSnapshot();
    });
  });
});
