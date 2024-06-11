import search from '../search';
import { DeepPartial } from '../../../../types/common/deep-partial';
import { Search } from '../../../../types/ui';

describe(search, () => {
  it('unrelated action return same state', () => {
    const state: DeepPartial<Search> = { path: '/zap' };
    const action = {
      type: 'UNRELATED',
      payload: {},
    };
    const newState = search(state, action as any);
    expect(newState).toEqual(state);
  });
});
