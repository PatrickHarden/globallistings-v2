import { createMatchSelector, RouterRootState } from 'connected-react-router';
import { PlpPath } from '../../types/plp';
import { PdpPath } from '../../types/pdp';
import RoutePaths from '../../constants/routePaths';
import { createSelector } from 'reselect';

export const plpMatchSelector = createMatchSelector<RouterRootState, PlpPath>(RoutePaths.plp);
export const pdpMatchSelector = createMatchSelector<RouterRootState, PdpPath>(RoutePaths.pdp);

export const pathParamsSelector = createSelector(
  plpMatchSelector,
  pdpMatchSelector,
  (plpMatch, pdpMatch) => ({ ...(plpMatch || {}), ...(pdpMatch || {}) })
);

export const plpUrlPathParamsSelector = createSelector(
  plpMatchSelector,
  match => {
    if (!match) {
      throw new Error('Url path must be defined to use this selector');
    }
    return match.params;
  }
);

export const pdpUrlPathParamsSelector = createSelector(
  pdpMatchSelector,
  match => {
    if (!match) {
      throw new Error('Url path must be defined to use this selector');
    }
    return match.params;
  }
);
