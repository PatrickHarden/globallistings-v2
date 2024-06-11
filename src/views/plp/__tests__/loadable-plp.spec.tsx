jest.mock('../../../api/google-maps/places');

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { State } from '../../../types/state';
import { DeepPartial } from '../../../types/common/deep-partial';
import LoadablePlp from '../loadable-plp';
import { placeGeocode } from '../../../api/google-maps/places';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import buildStore from '../../../app/createStore';
import { flushAllPromises } from '../../../utils/flush-all-promises';

// comment out this if  you want to see logs of actions being dispatched
console.log = jest.fn();
console.error = jest.fn();
console.group = jest.fn();

const MOCK_PROPERTY_ID = 'MOCK_PROPERTY_ID';
const MOCK_LOCATION = 'MOCK_LOCATION';
const MOCK_PATH = '/office/sales/london/results';

const state: DeepPartial<State> = {
  entities: {
    config: {
      searchConfig: {},
    },
  },
};

const mountApp = (initState: DeepPartial<State> = state, initialPath: string) => {
  const history = createMemoryHistory();
  history.push(initialPath);
  const store = buildStore(initState as DeepPartial<State>, history);

  const App = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LoadablePlp />
      </ConnectedRouter>
    </Provider>
  );

  return { wrapper: mount(App), store, history };
};

describe(LoadablePlp, () => {
  it('should throw an error if we failed to geocode', async () => {
    // Arrange
    (placeGeocode as jest.Mock).mockReturnValue(Promise.reject(new Error('Mock no results')));
    const expectedState: DeepPartial<State> = {
      entities: {
        config: { searchConfig: {} },
        geocode: {},
        properties: {},
        propertySearches: {},
        autocomplete: {},
        autocompleteSearches: [],
      },
      entitiesMeta: {
        autocompleteSearches: {},
        config: {},
        geocode: { london: { error: expect.any(Object), status: 'ERROR' } },
        propertySearches: {},
      },
      router: {
        action: 'PUSH',
        location: {
          hash: '',
          key: expect.any(String),
          pathname: MOCK_PATH,
          search: '',
          state: undefined,
        },
      },
      ui: { search: {}, autocomplete: {}, render: {}, map: {}, list: {} },
    };

    // Act
    const { store } = mountApp(state, MOCK_PATH);
    await flushAllPromises();

    // Assert
    expect(store.getState()).toEqual(expectedState);
  });

  it.skip('should dispatch correct actions if location is present in the URL', async () => {
    // Arrange
    (placeGeocode as jest.Mock).mockReturnValue(
      Promise.resolve({ place_id: MOCK_PROPERTY_ID, formatted_address: MOCK_LOCATION })
    );

    // Act
    const { store } = mountApp(state, MOCK_PATH);
    await flushAllPromises();

    // Assert
    expect(store.getState()).toEqual({
      entities: {
        config: { searchConfig: {} },
        autocomplete: {},
        autocompleteSearches: [],
        properties: {},
        propertySearches: {},
        geocode: {
          london: {
            formatted_address: MOCK_LOCATION,
            place_id: MOCK_PROPERTY_ID,
          },
        },
      },
      entitiesMeta: {
        autocompleteSearches: {},
        config: {},
        propertySearches: {},
        geocode: {
          london: {
            createdAt: expect.any(Number),
            status: 'SUCCESS',
          },
        },
      },
      router: {
        action: 'PUSH',
        location: {
          hash: '',
          key: expect.any(String),
          pathname: MOCK_PATH,
          search: '',
          state: undefined,
        },
      },
      ui: { search: {}, render: {}, autocomplete: {}, map: {}, list: {} },
    });
  });
});
