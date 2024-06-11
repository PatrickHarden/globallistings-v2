import reducer from '../propertySearches';
import { DeepPartial } from '../../../../types/common/deep-partial';
import { NormalisedSearchResult } from '../../../../types/results.js';
import { Actions } from '../properties';

const MOCK_HASH = 'MOCK_HASH';
const CREATED_AT_MOCK = 123123123;

describe('handle SUCCESS action', () => {
  const p1: DeepPartial<NormalisedSearchResult> = {
    entities: {
      properties: {
        P1: {
          numberOfBedrooms: 1,
        },
      },
    },
    result: ['P1'],
  };

  const p2: DeepPartial<NormalisedSearchResult> = {
    entities: {
      properties: {
        P2: {
          numberOfBedrooms: 2,
        },
      },
    },
    result: ['P2'],
  };

  const p1Modified: DeepPartial<NormalisedSearchResult> = {
    entities: {
      properties: {
        P1: {
          numberOfBedrooms: 3,
        },
      },
    },
    result: ['P1'],
  };

  it('should correctly handle single SUCCESS', () => {
    const successAction: Actions = {
      payload: p1 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const newState = reducer({}, successAction);

    expect(newState).toMatchSnapshot();
  });

  it('should overwrite old properties with new', () => {
    const successAction1: Actions = {
      payload: p1 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const successAction2: Actions = {
      payload: p2 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const newState1 = reducer({}, successAction1);
    const newState2 = reducer(newState1, successAction2);

    expect(newState2).toMatchSnapshot();
  });

  it('should overwrite old properties with same id', () => {
    const successAction1: Actions = {
      payload: p1 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const successAction2: Actions = {
      payload: p1Modified as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const newState1 = reducer({}, successAction1);
    const newState2 = reducer(newState1, successAction2);

    expect(newState2).toMatchSnapshot();
  });
});
