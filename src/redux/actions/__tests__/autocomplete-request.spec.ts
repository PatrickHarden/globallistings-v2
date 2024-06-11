jest.mock('../../selectors/config/autocomplete-config');
jest.mock('../../../api/google-maps/places');

import {
  lookupPlaceByName,
  suggestionsSuccess,
  suggestionsFailure,
  suggestionsRequest,
} from '../autocomplete-request';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { State } from '../../../types/state';
import { DeepPartial } from '../../../types/common/deep-partial';
import { placeAutoCompleteConfig } from '../../selectors/config/autocomplete-config';
import { placesAutocomplete } from '../../../api/google-maps/places';

const middlewares = [thunk];
const mockStore = configureMockStore<State>(middlewares);

describe(suggestionsSuccess, () => {
  it('should create correct action', () => {
    const expectedResult = {
      meta: {
        hash: 'MOCK_HASH',
        receivedAt: expect.any(Number),
      },
      payload: {
        entities: {
          suggestions: {},
        },
        result: [],
      },
      type: 'GET_SUGGESTIONS_SUCCESS',
    };

    const result = suggestionsSuccess({ entities: { suggestions: {} }, result: [] }, 'MOCK_HASH');

    expect(result).toEqual(expectedResult);
  });
});

describe(suggestionsFailure, () => {
  it('should create correct action', () => {
    const expectedResult = {
      meta: { hash: 'MOCK_HASH' },
      payload: expect.any(Object),
      type: 'GET_SUGGESTIONS_FAILURE',
    };

    const result = suggestionsFailure(new Error('Boom'), 'MOCK_HASH');

    expect(result).toEqual(expectedResult);
  });
});

describe(suggestionsRequest, () => {
  it('should create correct action', () => {
    const expectedResult = {
      meta: { hash: 'MOCK_HASH' },
      type: 'GET_SUGGESTIONS_REQUEST',
    };

    const result = suggestionsRequest('MOCK_HASH');

    expect(result).toEqual(expectedResult);
  });
});

describe(lookupPlaceByName, () => {
  it('should dispatch correct actions for a successful request', async () => {
    // Arrange
    ((placeAutoCompleteConfig as unknown) as jest.Mock).mockReturnValue({});
    ((placesAutocomplete as unknown) as jest.Mock).mockReturnValue(Promise.resolve([]));
    const initState: DeepPartial<State> = {};
    const store = mockStore(initState as State);

    // Act
    await store.dispatch(lookupPlaceByName('london') as any);
    const actions = store.getActions();

    // Assert
    expect(actions).toEqual([
      { meta: { hash: 'london' }, type: 'GET_SUGGESTIONS_REQUEST' },
      {
        meta: { hash: 'london', receivedAt: expect.any(Number) },
        payload: { entities: {}, result: [] },
        type: 'GET_SUGGESTIONS_SUCCESS',
      },
    ]);
  });

  it('should dispatch correct actions for a failed request', async () => {
    // Arrange
    ((placeAutoCompleteConfig as unknown) as jest.Mock).mockReturnValue({});
    ((placesAutocomplete as unknown) as jest.Mock).mockReturnValue(
      Promise.reject(new Error('BOOM'))
    );
    const initState: DeepPartial<State> = {};
    const store = mockStore(initState as State);

    // Act
    await store.dispatch(lookupPlaceByName('london') as any);
    const actions = store.getActions();

    // Assert
    expect(actions).toEqual([
      { meta: { hash: 'london' }, type: 'GET_SUGGESTIONS_REQUEST' },
      { meta: { hash: 'london' }, payload: expect.any(Object), type: 'GET_SUGGESTIONS_FAILURE' },
    ]);
  });
});
