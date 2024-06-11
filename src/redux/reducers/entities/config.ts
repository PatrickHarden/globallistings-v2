import { convert } from '../../../api/converters/config';
import { createFetchConfigSuccess } from '../../actions/config';
import { ActionType } from 'typesafe-actions';
import { DeepPartial } from 'redux';
import { Config } from '../../../types/config';

export type Actions = ActionType<typeof createFetchConfigSuccess>;

export default (state: DeepPartial<Config> = {}, action: Actions): Config | {} => {
  switch (action.type) {
    case 'FETCH_CONFIG_SUCCESS':
      return convert(action.payload);
    default:
      return state;
  }
};
