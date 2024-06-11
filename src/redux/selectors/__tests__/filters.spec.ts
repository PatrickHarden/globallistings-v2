jest.mock('../../selectors/match');

import {
  filtersInfoSelector,
  RangeFilterInfo,
  defaultFiltersParamsSelectors,
} from '../config/filters';
import { DeepPartial } from 'redux';
import { State } from '../../../types/state';

import { pathParamsSelector } from '../../selectors/match';
((pathParamsSelector as unknown) as jest.Mock).mockReturnValue({});

describe(filtersInfoSelector, () => {
  it('should correctly map radius param to an option', () => {
    const state: DeepPartial<State> = {
      router: { location: { search: '?radius=1' } },
      entities: {
        config: {
          filters: [
            {
              name: 'radius',
              type: 'select',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    expect(filtersInfoSelector(state as State)).toMatchSnapshot();
  });

  it('should correctly map range param to an option', () => {
    const state: DeepPartial<State> = {
      router: { location: { search: '?minValue|maxValue_min=1&minValue|maxValue_max=2' } },
      entities: {
        config: {
          filters: [
            {
              name: 'minValue|maxValue',
              type: 'range',
              minValues: [
                { value: '', label: 'None', type: 'min' },
                { value: '1', label: 'One', type: 'min' },
                { value: '2', label: 'Two', type: 'min' },
              ],
              maxValues: [
                { value: '', label: 'None', type: 'max' },
                { value: '3', label: 'Three', type: 'max' },
                { value: '4', label: 'Four', type: 'max' },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    expect(filtersInfoSelector(state as State)).toMatchSnapshot();
  });

  it('should remove invalid options from a range filter', () => {
    const state: DeepPartial<State> = {
      router: { location: { search: '?minValue|maxValue_min=2&minValue|maxValue_max=3' } },
      entities: {
        config: {
          filters: [
            {
              name: 'minValue|maxValue',
              type: 'range',
              minValues: [
                { value: '', label: 'None', type: 'min' },
                { value: '1', label: 'One', type: 'min' },
                { value: '2', label: 'Two', type: 'min' },
                { value: '3', label: 'Three', type: 'min' },
                { value: '4', label: 'four', type: 'min' },
              ],
              maxValues: [
                { value: '', label: 'None', type: 'max' },
                { value: '1', label: 'One', type: 'max' },
                { value: '2', label: 'Two', type: 'max' },
                { value: '3', label: 'Three', type: 'max' },
                { value: '4', label: 'four', type: 'max' },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    expect((filtersInfoSelector(state as State)[0] as RangeFilterInfo).min.items).toEqual([
      { value: '', label: 'None', type: 'min' },
      { value: '1', label: 'One', type: 'min' },
      { value: '2', label: 'Two', type: 'min' },
      { value: '3', label: 'Three', type: 'min' },
    ]);

    expect((filtersInfoSelector(state as State)[0] as RangeFilterInfo).max.items).toEqual([
      { value: '', label: 'None', type: 'max' },
      { value: '2', label: 'Two', type: 'max' },
      { value: '3', label: 'Three', type: 'max' },
      { value: '4', label: 'four', type: 'max' },
    ]);
  });

  it('should correctly map radius param', () => {
    const state: DeepPartial<State> = {
      router: { location: { search: '?radius[]=1&radius[]=2' } },
      entities: {
        config: {
          filters: [
            {
              name: 'radius',
              type: 'select',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    expect(filtersInfoSelector(state as State)).toMatchSnapshot();
  });

  it('should handle unmatched query correctly', () => {
    const state: DeepPartial<State> = {
      router: { location: { search: '?radius=3' } },
      entities: {
        config: {
          filters: [
            {
              name: 'radius',
              type: 'select',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    expect(filtersInfoSelector(state as State)).toMatchSnapshot();
  });
});

describe(defaultFiltersParamsSelectors, () => {
  it('with no default options should return empty object', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [
            {
              name: 'radius',
              type: 'select',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    const result = defaultFiltersParamsSelectors(state as State);

    expect(result).toEqual({});
  });

  it('with a default option should return correct params', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [
            {
              name: 'radius',
              type: 'select',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two', default: true },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    const result = defaultFiltersParamsSelectors(state as State);

    expect(result).toEqual({ radius: '2' });
  });

  it('with multiple default options should return correct params', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [
            {
              name: 'radius',
              type: 'select',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two', default: true },
              ],
            },
            {
              name: 'area',
              type: 'select',
              options: [
                { value: 'A', label: 'Area A' },
                { value: 'B', label: 'Area B', default: true },
              ],
            },
          ],
        },
      },
      ui: { search: {} },
    };

    const result = defaultFiltersParamsSelectors(state as State);

    expect(result).toEqual({ radius: '2', area: 'B' });
  });

  it('with multiple default options should return correct params', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [],
        },
      },
      ui: { search: {} },
    };

    const result = defaultFiltersParamsSelectors(state as State);

    expect(result).toEqual({});
  });
});
