import payload from '../../../../tests/fixtures/residential-response-normalised.json';

import reducer from '../propertySearches';

const MOCK_HASH = 'MOCK_HASH';
const MOCK_HASH_2 = 'MOCK_HASH_2';
const CREATED_AT_MOCK = new Date('2018-12-10T11:11:13Z');

describe('handle SUCCESS action', () => {
  const p1 = {
    entities: {
      properties: {
        P1: {
          title: 'title 1',
        },
      },
    },
    result: ['P1'],
  };

  const p2 = {
    entities: {
      properties: {
        P2: {
          title: 'title 2',
        },
      },
    },
    result: ['P2'],
  };

  const p1Modified = {
    entities: {
      properties: {
        P1: {
          title: 'title 1 modified',
        },
      },
    },
    result: ['P1'],
  };

  it('should correctly handle single SUCCESS', () => {
    const successAction = {
      payload,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const newState = reducer({}, successAction as any);

    expect(newState).toMatchSnapshot();
  });

  it('should amend old property searches with new', () => {
    const successAction1 = {
      payload: p1,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const successAction2 = {
      payload: p2,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH_2, receivedAt: CREATED_AT_MOCK },
    };
    const newState1 = reducer({}, successAction1 as any);
    const newState2 = reducer(newState1, successAction2 as any);

    expect(newState2).toMatchSnapshot();
  });

  it('should overwrite old properties with same id', () => {
    const successAction1 = {
      payload: p1,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const successAction2 = {
      payload: p1Modified,
      type: 'SEARCH_PROPERTIES_SUCCESS',
      meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
    };
    const newState1 = reducer({}, successAction1 as any);
    const newState2 = reducer(newState1, successAction2 as any);

    expect(newState2).toMatchSnapshot();
  });
});

it('should correctly handle request', () => {
  const successAction = {
    type: 'SEARCH_PROPERTIES_REQUEST',
    meta: { hash: MOCK_HASH, receivedAt: CREATED_AT_MOCK },
  };
  const newState = reducer({}, successAction as any);

  expect(newState).toMatchSnapshot();
});

it('should correctly handle failure', () => {
  const successAction = {
    type: 'SEARCH_PROPERTIES_FAILURE',
    payload: new Error('boom'),
    meta: {
      hash: MOCK_HASH,
      receivedAt: CREATED_AT_MOCK,
    },
  };
  const newState = reducer({}, successAction as any);

  expect(newState).toMatchSnapshot();
});
