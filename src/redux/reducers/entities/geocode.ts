import { ActionType } from 'typesafe-actions';
import { createGeocodeSuccess } from '../../actions/geocode';
import { Dictionary } from '../../../types/common/dictionary';
import { Geocode } from '../../../types/state';

export type GeocodeActions = ActionType<typeof createGeocodeSuccess>;

export default (state: Dictionary<Geocode> = {}, action: GeocodeActions): Dictionary<Geocode> => {
  switch (action.type) {
    case 'GEOCODE_SUCCESS':
      return { ...state, [action.meta.hash]: action.payload };
    default:
      return state;
  }
};
