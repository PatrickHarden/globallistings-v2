jest.mock('../../selectors/location');
jest.mock('../../selectors/match');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { State } from '../../../types/state';
import { CALL_HISTORY_METHOD } from 'connected-react-router';
import { updateQueryParams, updatePath, navigateToProperty } from '../navigation';
import { pathSelector, querySelector, queryStringSelector } from '../../selectors/location';
import { plpUrlPathParamsSelector } from '../../selectors/match';

const middlewares = [thunk];
const mockStore = configureMockStore<State>(middlewares);

((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
  location: 'london',
  usageType: 'office',
  transactionType: 'sale',
});

((pathSelector as unknown) as jest.Mock).mockReturnValue('/');
((querySelector as unknown) as jest.Mock).mockReturnValue({});

describe(updateQueryParams, () => {
  it('should push new args to the url', async () => {
    // Arrange
    const store = mockStore({} as State);

    // Act
    // TODO fix typings
    await store.dispatch(updateQueryParams({ foo: '1' }) as any);

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { args: ['/?foo=1'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });

  it('should update existing args in the url', async () => {
    // Arrange
    const store = mockStore({} as State);
    ((querySelector as unknown) as jest.Mock).mockReturnValue({ foo: 1 });

    // Act
    // TODO fix typings
    await store.dispatch(updateQueryParams({ foo: '2' }) as any);

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { args: ['/?foo=2'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });

  it('should add new parameter to url', async () => {
    // Arrange
    ((querySelector as unknown) as jest.Mock).mockReturnValue({ foo: 1 });
    const store = mockStore({} as State);

    // Act
    // TODO fix typings
    await store.dispatch(updateQueryParams({ bar: '2' }) as any);

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { args: ['/?bar=2&foo=1'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });
});

describe(updatePath, () => {
  it('should push new path segments to the url', async () => {
    // Arrange
    ((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
      location: 'london',
      usageType: 'office',
      transactionType: 'sale',
    });
    ((queryStringSelector as unknown) as jest.Mock).mockReturnValue('');
    const store = mockStore({} as State);

    // Act
    // TODO fix typings
    await store.dispatch(updatePath('location', 'dublin') as any);

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { args: ['/office/sale/dublin/results'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });

  it('should push new path segments to the url and keep original query string', async () => {
    // Arrange
    ((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
      location: 'london',
      usageType: 'office',
      transactionType: 'sale',
    });
    ((queryStringSelector as unknown) as jest.Mock).mockReturnValue('?foo=zap');
    const store = mockStore({} as State);
    // Act
    // TODO fix typings
    await store.dispatch(updatePath('location', 'dublin') as any);

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { args: ['/office/sale/dublin/results?foo=zap'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });

  describe(navigateToProperty, () => {
    it('should reroute to PDP', async () => {
      // Arrange
      const store = mockStore({} as State);

      // Act
      await store.dispatch(navigateToProperty('foo') as any);

      // Assert
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          payload: { args: ['/details/foo'], method: 'push' },
          type: CALL_HISTORY_METHOD,
        },
      ]);
    });
  });
});
