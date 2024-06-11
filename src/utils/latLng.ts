import { LatLng } from '../types/state';

export const convertGoogleLatLng = (latLng: google.maps.LatLng): LatLng => ({
  lat: latLng.lat(),
  lng: latLng.lng(),
});
