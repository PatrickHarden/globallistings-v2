jest.mock('connected-react-router', () => {
  const original = require.requireActual('connected-react-router');
  return {
    ...original,
    createMatchSelector: () => () => ({
      params: { location: 'london', usageType: 'office', transactionType: 'sale' },
    }),
  };
});

import {
  primaryFiltersSelector,
  secondaryFiltersSelector,
  conditionalFiltersSelector,
} from '../view-filters';
import { DeepPartial } from 'redux';
import { State } from '../../../types/state';

describe(primaryFiltersSelector, () => {
  it('should retrieve all filters with a primary placement', () => {
    const state: DeepPartial<State> = {
      router: { location: { search: '?radius=1' } },
      entities: {
        config: {
          filters: [
            {
              name: 'filter1',
              type: 'select',
              placement: 'secondary',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
            {
              name: 'filter2',
              type: 'select',
              placement: 'primary',
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

    const result = primaryFiltersSelector(state as State);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('filter2');
  });
});

describe(secondaryFiltersSelector, () => {
  it('should retrieve all filters with a secondary placement', () => {
    const state: DeepPartial<State> = {
      router: { location: { search: '?radius=1' } },
      entities: {
        config: {
          filters: [
            {
              name: 'filter1',
              type: 'select',
              placement: 'secondary',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
            {
              name: 'filter2',
              type: 'select',
              placement: 'primary',
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

    const result = secondaryFiltersSelector(state as State);

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('filter1');
  });
});

describe(conditionalFiltersSelector, () => {
  let state: DeepPartial<State>;
  beforeEach(() => {
    state = {
      router: {
        location: {
          pathname: '/usageType/sale/london/results',
          search: '',
          hash: '',
        },
        action: 'POP',
      },
      entities: {
        config: {
          params: {
            Site: 'foo',
            Sort: 'bar',
            Unit: 'baz',
          },
          filters: [
            {
              name: 'filter1',
              type: 'select',
              placement: 'secondary',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
            {
              name: 'filter2',
              type: 'select',
              placement: 'primary',
              options: [
                { value: '', label: 'None' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ],
            },
          ],
        },
        geocode: {
          london: {
            bounds: {
              ne: { lat: 1, lng: 2 },
              sw: { lat: 1, lng: 2 },
            },
            center: {
              lat: 1,
              lng: 2,
            },
          },
        },
      },
      ui: { search: {} },
    };
  });

  it('should return all flters when none have conditions attached', () => {
    const result = conditionalFiltersSelector(state as State);
    expect(result.length).toBe(2);
  });

  it('should return all flters with no conditions attached and filters that meet conditions', () => {
    state.entities.config.filters.push({
      name: 'filter3',
      type: 'select',
      placement: 'primary',
      conditional: {
        Sort: 'bar',
      },
      options: [
        { value: '', label: 'None' },
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ],
    });
    const result = conditionalFiltersSelector(state as State);
    expect(result.length).toBe(3);
  });

  it('should return all flters with no conditions attached and filters that meet conditions but remove filters that dont meet conditions', () => {
    state.entities.config.filters.push(
      {
        name: 'filter3',
        type: 'select',
        placement: 'primary',
        conditional: {
          Sort: 'foo',
        },
        options: [
          { value: '', label: 'None' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ],
      },
      {
        name: 'filter4',
        type: 'select',
        placement: 'primary',
        conditional: {
          Sort: 'bar',
        },
        options: [
          { value: '', label: 'None' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ],
      }
    );
    const result = conditionalFiltersSelector(state as State);
    expect(result.length).toBe(3);
  });

  it('will return a filter if ALL conditions pass', () => {
    state.entities.config.filters.push({
      name: 'filter3',
      type: 'select',
      placement: 'primary',
      conditional: {
        Site: 'foo',
        Sort: 'bar',
      },
      options: [
        { value: '', label: 'None' },
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ],
    });
    const result = conditionalFiltersSelector(state as State);
    expect(result.length).toBe(3);
  });

  it('will NOT return a filter if not all conditions pass', () => {
    state.entities.config.filters.push({
      name: 'filter3',
      type: 'select',
      placement: 'primary',
      conditional: {
        Site: 'foo',
        Sort: 'baz',
      },
      options: [
        { value: '', label: 'None' },
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ],
    });
    const result = conditionalFiltersSelector(state as State);
    expect(result.length).toBe(2);
  });
});

jest.mock('connected-react-router', () => {
  const original = require.requireActual('connected-react-router');
  return {
    ...original,
    createMatchSelector: () => () => ({
      params: { location: 'london', usageType: 'industrial', transactionType: 'letting' },
    }),
  };
});

describe(conditionalFiltersSelector, () => {
  let state: DeepPartial<State>;

  it('make sure selected items are returned to properly set filters', () => {
    const state: DeepPartial<State> = {
      router: {
        location: {
          pathname: '/industrial/letting/london/results',
          search: '',
          hash: '',
        },
        action: 'POP',
      },
      entities: {
        config: {
          filters: [
            {
              name: 'usageType',
              type: 'select',
              options: [
                { value: 'office', label: 'Office' },
                { value: 'industrial', label: 'Industrial' },
                { value: 'retail', label: 'Retail' },
              ],
            },
            {
              name: 'transactionType',
              type: 'select',
              options: [{ value: 'sale', label: 'To Buy' }, { value: 'letting', label: 'To Let' }],
            },
          ],
        },
        geocode: {
          london: {
            bounds: {
              ne: { lat: 1, lng: 2 },
              sw: { lat: 1, lng: 2 },
            },
            center: {
              lat: 1,
              lng: 2,
            },
          },
        },
      },
      ui: { search: {} },
    };
    expect(conditionalFiltersSelector(state as State)).toMatchSnapshot();
  });
});
