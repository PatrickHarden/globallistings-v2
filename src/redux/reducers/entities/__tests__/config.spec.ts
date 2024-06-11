import config from '../config';
import { createFetchConfigSuccess } from '../../../actions/config';
import { ActionType } from 'typesafe-actions';

describe(config, () => {
  it('unrelated action return same state', () => {
    const state = { foo: 'zap' };
    const action = {
      type: 'UNRELATED',
      payload: {},
    };
    const newState = config(state, action as ActionType<typeof createFetchConfigSuccess>);
    expect(newState).toEqual(state);
  });

  it('should return default state if undefined state is passed', () => {
    const action = {
      type: 'UNRELATED',
      payload: {},
    };
    const newState = config(undefined, action as ActionType<typeof createFetchConfigSuccess>);
    expect(newState).toEqual({});
  });

  it('should handle FetchConfigSuccessAction action ', () => {
    const action = {
      type: 'FETCH_CONFIG_SUCCESS',
      payload: {
        i18n: {
          one: 'uno',
        },
        searchConfig: {
          searchResultsPage: 'zap',
        },
      },
    } as ActionType<typeof createFetchConfigSuccess>;
    const newState = config(undefined, action);
    expect(newState).toMatchSnapshot();
  });
});
