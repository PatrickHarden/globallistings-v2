import { createStandardAction } from 'typesafe-actions';
import { Dictionary } from '../../types/common/dictionary';

export const setSearchLocation = createStandardAction('SET_SEARCH_LOCATION')<string>();
export const changeSearchFilter = createStandardAction('CHANGE_SEARCH_FILTER')<
  Dictionary<string>
>();
