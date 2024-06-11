import { placeGeocode } from '../../api/google-maps/places';
import { State, Geocode } from '../../types/state';
import { restrictionsSelector } from '../selectors/config/config';

import { plpLocationNameSelector } from '../selectors/location';
import {
  createRequestPending,
  createRequestFailure,
  createRequestSuccess,
} from '../../types/common/action-creators';

export const createGeocodeRequest = createRequestPending('GEOCODE_REQUEST');
export const createGeocodeFailure = createRequestFailure('GEOCODE_FAILURE');
export const createGeocodeSuccess = createRequestSuccess<Geocode, 'GEOCODE_SUCCESS'>(
  'GEOCODE_SUCCESS'
);

export const validateUrl = () => (dispatch: Function, getState: () => State) => {
  const state = getState();
  const placeName = plpLocationNameSelector(state);
  const restrictions = restrictionsSelector(state);

  dispatch(createGeocodeRequest(placeName));

  return placeGeocode(placeName, restrictions)
    .then(place => {
      dispatch(createGeocodeSuccess(place, placeName));
    })
    .catch(err => dispatch(createGeocodeFailure(err, placeName)));
};
