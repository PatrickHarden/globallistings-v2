import { ActionType } from 'typesafe-actions';

import { DeepPartial } from '../../../types/common/deep-partial';
import { List } from '../../../types/ui';

import * as actions from '../../actions/list';

type RenderActionTypes = ActionType<typeof actions>;

const initialState: DeepPartial<List> = {};

export default (state = initialState, action: RenderActionTypes) => {
  switch (action.type) {
    case 'LIST_PROPERTY_MOUSEENTER':
      return { ...state, highlightedProperty: action.payload };
    case 'LIST_PROPERTY_MOUSELEAVE':
      return { ...state, highlightedProperty: undefined };
    default:
      return state;
  }
};
