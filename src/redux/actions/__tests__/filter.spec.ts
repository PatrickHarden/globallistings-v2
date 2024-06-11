jest.mock('connected-react-router', () => {
  const original = require.requireActual('connected-react-router');
  return {
    ...original,
    createMatchSelector: () => () => ({
      params: { location: 'london', usageType: 'office', transactionType: 'sale' },
    }),
  };
});

import { handleFilterChange } from '../filter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { State } from '../../../types/state';
import { FilterModifier } from '../../../types/config';
import { CALL_HISTORY_METHOD } from 'connected-react-router';

const middlewares = [thunk];
const mockStore = configureMockStore<State>(middlewares);

describe(handleFilterChange, () => {
  it('should dispatch correct action for query', async () => {
    const store = mockStore({
      router: {
        location: {
          pathname: 'london',
          search: '?foo=zap',
        },
      },
    } as State);

    await store.dispatch(handleFilterChange('key', 'value', FilterModifier.query) as any);
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        payload: { args: ['london?foo=zap&key=value'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });

  it('should dispatch correct action for url', async () => {
    const store = mockStore({
      router: {
        location: {
          pathname: '___MOCK IS USED INSTEAD___',
          search: '?foo=zap',
        },
      },
    } as State);

    await store.dispatch(handleFilterChange('usageType', 'ZAP', FilterModifier.url) as any);
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        payload: { args: ['/ZAP/sale/london/results?foo=zap'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });

  it('should dispatch correct action for url', async () => {
    const store = mockStore({
      router: {
        location: {
          pathname: '___MOCK IS USED INSTEAD___',
          search: '?foo=zap',
        },
      },
    } as State);

    await store.dispatch(handleFilterChange('usageType', 'ZAP', FilterModifier.url) as any);
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        payload: { args: ['/ZAP/sale/london/results?foo=zap'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });

  it('should throw an error if we try to change url segment which does not exist', async () => {
    const store = mockStore({
      router: {
        location: {
          pathname: '___MOCK IS USED INSTEAD___',
          search: '?foo=zap',
        },
      },
    } as State);

    expect(() =>
      store.dispatch(handleFilterChange('nonExistingPathSegment', 'ZAP', FilterModifier.url) as any)
    ).toThrowError();
  });
});
