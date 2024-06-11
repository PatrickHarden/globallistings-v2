import { ActionType } from 'typesafe-actions';

import { DeepPartial } from '../../../types/common/deep-partial';
import { Render } from '../../../types/ui';

import { renderCompleteAction } from '../../actions/render';

type RenderActionTypes = ActionType<typeof renderCompleteAction>;

const initialState: DeepPartial<Render> = {};

export default (state = initialState, action: RenderActionTypes): DeepPartial<Render> => {
  switch (action.type) {
    case 'RENDER_COMPLETE':
      return { ...state, complete: true };
    default:
      return state;
  }
};
