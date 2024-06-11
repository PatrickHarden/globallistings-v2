jest.mock('../../selectors/match');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import residential from '../../../tests/fixtures/residential-response.json';
import { fetchProperties } from '../searchProperties';
import { DeepPartial } from '../../../types/common/deep-partial';
import { State } from '../../../types/state';
import { plpUrlPathParamsSelector } from '../../selectors/match';

const MOCK_HASH = 'MOCK_HASH';
jest.mock('murmurhash-js', () => ({ murmur2: () => MOCK_HASH }));
((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
  location: 'london',
  usageType: 'office',
  transactionType: 'sale',
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const initState: DeepPartial<State> = {
  router: { location: { search: '?foo=zap' } },
  entities: {
    config: { params: {}, filters: [] },
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

describe('Making an api request for property listings', () => {
  let store: any;
  afterEach(() => {
    mock.reset();
  });

  beforeEach(() => {
    store = mockStore(initState);
  });

  it.only('should dispatch correct actions for successful request', async () => {
    // Arrange
    const apiWithAnyQuery = /\/api\/propertylistings.*/;
    mock.onGet(apiWithAnyQuery).replyOnce(200, residential);

    // Act
    await store.dispatch(fetchProperties());

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      { meta: { hash: MOCK_HASH }, type: 'SEARCH_PROPERTIES_REQUEST' },
      {
        meta: { hash: MOCK_HASH, receivedAt: expect.any(Number) },
        payload: expect.any(Object),
        type: 'SEARCH_PROPERTIES_SUCCESS',
      },
    ]);
    expect(actions[1].payload).toMatchSnapshot();
  });

  it('should dispatch correct actions for network error', async () => {
    // Arrange
    mock.onAny().networkError();

    // Act
    await store.dispatch(fetchProperties());

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      { meta: { hash: MOCK_HASH }, type: 'SEARCH_PROPERTIES_REQUEST' },
      {
        meta: { hash: MOCK_HASH },
        payload: expect.any(Error),
        type: 'SEARCH_PROPERTIES_FAILURE',
      },
    ]);
  });

  it('should dispatch correct actions for network timeout', async () => {
    // Arrange
    mock.onAny().timeout();

    // Act
    await store.dispatch(fetchProperties());

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      { meta: { hash: MOCK_HASH }, type: 'SEARCH_PROPERTIES_REQUEST' },
      {
        meta: { hash: MOCK_HASH },
        payload: expect.any(Error),
        type: 'SEARCH_PROPERTIES_FAILURE',
      },
    ]);
  });
});
