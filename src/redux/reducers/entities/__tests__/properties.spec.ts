import reducer from '../properties';
import { NormalisedSearchResult } from '../../../../types/results.js';
import { DeepPartial } from '../../../../types/common/deep-partial';
import { ActionType } from 'typesafe-actions';
import { searchPropertiesSuccess } from '../../../actions/searchProperties';

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
    const successAction = {
      payload: p1 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    } as ActionType<typeof searchPropertiesSuccess>;
    const newState = reducer({}, successAction as any);

    expect(newState).toMatchSnapshot();
  });

  it('should amend new properties', () => {
    const successAction1 = {
      payload: p1 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    } as ActionType<typeof searchPropertiesSuccess>;
    const successAction2 = {
      payload: p2 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    } as ActionType<typeof searchPropertiesSuccess>;
    const newState1 = reducer({}, successAction1 as any);
    const newState2 = reducer(newState1, successAction2 as any);

    expect(newState2).toMatchSnapshot();
  });

  it('should overwrite old properties with same id', () => {
    const successAction1 = {
      payload: p1 as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    } as ActionType<typeof searchPropertiesSuccess>;
    const successAction2 = {
      payload: p1Modified as NormalisedSearchResult,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    } as ActionType<typeof searchPropertiesSuccess>;
    const newState1 = reducer({}, successAction1 as any);
    const newState2 = reducer(newState1, successAction2 as any);

    expect(newState2).toMatchSnapshot();
  });
});
