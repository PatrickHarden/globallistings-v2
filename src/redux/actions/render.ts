import { createAction } from 'typesafe-actions';

import dispatchEvent from '../../utils/eventDispatcher';
import { renderCompleteEvent } from '../../constants/domEvents';

export const renderCompleteAction = createAction('RENDER_COMPLETE');

export const renderComplete = () => (dispatch: Function) => {
  dispatchEvent(renderCompleteEvent);
  dispatch(renderCompleteAction());
};
