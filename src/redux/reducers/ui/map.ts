import { ActionType } from 'typesafe-actions';

import { DeepPartial } from '../../../types/common/deep-partial';
import { Map } from '../../../types/ui';

import { onPinClicked } from '../../actions/map';

type RenderActionTypes = ActionType<typeof onPinClicked>;

const initialState: DeepPartial<Map> = {};

export default (state = initialState, action: RenderActionTypes) => {
  switch (action.type) {
    case 'MAP_PIN_CLICKED':
      return { ...state, selectedPropertyPin: action.payload };
    default:
      return state;
  }
};
