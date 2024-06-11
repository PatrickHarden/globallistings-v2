jest.mock('../../selectors/match');

import { selectedAutocompletionItem, updateUrlWithSelectedLocation } from '../autocomplete';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { State } from '../../../types/state';
import { DeepPartial } from 'redux';
import { CALL_HISTORY_METHOD } from 'connected-react-router';
import { plpUrlPathParamsSelector } from '../../selectors/match';

const middlewares = [thunk];
const mockStore = configureMockStore<State>(middlewares);

((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
  location: 'london',
  usageType: 'office',
  transactionType: 'sale',
});

describe(selectedAutocompletionItem, () => {
  it('should create correct action', () => {
    expect(selectedAutocompletionItem('zpa')).toMatchSnapshot();
  });
});

describe(updateUrlWithSelectedLocation, () => {
  it('should create correct action', () => {
    const state: DeepPartial<State> = {
      router: {
        location: {},
      },
      entities: {
        autocomplete: {
          MOCK_ID: { description: 'zap' },
        },
      },
    };

    const store = mockStore(state as State);

    store.dispatch(updateUrlWithSelectedLocation('MOCK_ID') as any);

    expect(store.getActions()).toEqual([
      {
        payload: { args: ['/office/sale/zap/results'], method: 'replace' },
        type: CALL_HISTORY_METHOD,
      },
    ]);
  });
});
