import { createStandardAction } from 'typesafe-actions';
import { State } from '../../types/state';
import { autocompleteSelector } from '../selectors/state';
import { updatePath } from './navigation';

export const selectedAutocompletionItem = createStandardAction('SELECT_AUTOCOMPLETION_ITEM')<
  string
>();

export const updateUrlWithSelectedLocation = (placeId: string) => (
  dispatch: Function,
  getState: () => State
) => {
  const place = autocompleteSelector(getState())[placeId];
  if (!!place) {
    dispatch(updatePath('location', place.description));
  }
};
