jest.mock('../../../redux/selectors/match');

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../../themes/default/theme';
import Container from '../plp-container';
import buildStore from '../../../app/createStore';
import residential from '../../../tests/fixtures/residential-response.json';
import { PropertyList } from '../property-list/property-list';
import config from '../../../tests/fixtures/commercial-config-uk.json';
import { State } from '../../../types/state';
import { DeepPartial } from '../../../types/common/deep-partial';
import { flushAllPromises } from '../../../utils/flush-all-promises';
import { plpUrlPathParamsSelector } from '../../../redux/selectors/match';

// comment out this if  you want to see logs of actions being dispatched
console.log = jest.fn();
console.group = jest.fn();

((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
  location: 'london',
  transactionType: 'sale',
  usageType: 'office',
});

const mock = new MockAdapter(axios);
afterEach(() => {
  mock.reset();
});

const mountApp = (initialPath = '?location=London&lat=1&lon=2&placeId=123') => {
  const history = createMemoryHistory();
  const initialState: DeepPartial<State> = {
    // TODO fix the type
    router: {
      location: {
        search: initialPath,
      },
    },
    entities: {
      config: config.entities.config as any,
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
  };
  const store = buildStore(initialState, history);
  const App = (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Container />
      </Provider>
    </ThemeProvider>
  );
  return { app: mount(App), store };
};

it('should handle failed API request', async () => {
  // Arrange
  mock.onAny().networkError();

  // Act
  const { app } = mountApp();

  // Assert
  expect(app.find(PropertyList).prop('properties').length).toEqual(0);
  await flushAllPromises();
  expect(app.find(PropertyList).prop('properties').length).toEqual(0);
});

it('should handle timed out API request', async () => {
  // Arrange
  mock.onAny().timeout();

  // Act
  const { app } = mountApp();

  await flushAllPromises();

  expect(app.find(PropertyList).prop('properties').length).toEqual(0);
});

it('should handle successful API request', async () => {
  // Arrange
  const apiWithAnyQuery = /\/api\/propertylistings.*/;
  mock.onGet(apiWithAnyQuery).replyOnce(200, residential);

  // Act
  const { app } = mountApp();

  // Assert
  expect(app.find(PropertyList).prop('properties').length).toEqual(0);
  await flushAllPromises();
  app.update();
  expect(app.find(PropertyList).prop('properties').length).toBeGreaterThan(0);
});

// TODO once we add filters and other controls we should test it
xit('should handle URL changes', async () => {
  // Arrange
  const apiWithAnyQuery = /\/api\/propertylistings.*/;
  mock.onGet(apiWithAnyQuery).replyOnce(200, residential);

  // Act
  const { app } = mountApp();
  // store.dispatch();

  // Assert
  expect(app.find('h1').text()).toContain('PENDING');
  await flushAllPromises();
  expect(app.find('h1').text()).toContain('SUCCESS');
});
