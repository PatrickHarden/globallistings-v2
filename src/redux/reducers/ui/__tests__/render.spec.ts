import render from '../render';
import { DeepPartial } from '../../../../types/common/deep-partial';
import { Render } from '../../../../types/ui';

describe(render, () => {
  it('returns same state from an unrelated action', () => {
    const state: DeepPartial<Render> = {};
    const action = {
      type: 'UNRELATED',
      payload: {},
    };
    const newState = render(state, action as any);
    expect(newState).toEqual(state);
  });

  it('returns correct state from a RENDER_COMPLETE action', () => {
    const state: DeepPartial<Render> = {};
    const action = {
      type: 'RENDER_COMPLETE',
    };
    const newState = render(state, action as any);
    expect(newState).toEqual({ ...state, complete: true });
  });
});
