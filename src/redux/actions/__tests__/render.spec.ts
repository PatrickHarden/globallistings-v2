import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { DeepPartial } from 'redux';
import { renderComplete } from '../render';
import { State } from '../../../types/state';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(renderComplete, () => {
  let store: any;
  let eventListener: any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const state: DeepPartial<State> = {
      ui: {
        render: {},
      },
    };
    store = mockStore(state);
    eventListener = jest.fn();
    document.addEventListener('CBRESPA_LOADED', eventListener);
  });

  it('should dispatch correct actions, set window var and fire event after successful render', async done => {
    // Act
    await store.dispatch(renderComplete());

    // Assert
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'RENDER_COMPLETE' }]);
    setTimeout(() => {
      expect(eventListener).toHaveBeenCalled();
      done();
    });
  });
});
