import { Bounds } from '../types/state';

export const googleBoundsToBounds = (bounds: google.maps.LatLngBounds): Bounds => {
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  return {
    ne: {
      lat: ne.lat(),
      lng: ne.lng(),
    },
    sw: {
      lat: sw.lat(),
      lng: sw.lng(),
    },
  };
};

export const boundsToGoogleBounds = (bounds: Bounds): google.maps.LatLngBounds =>
  new google.maps.LatLngBounds(bounds.sw, bounds.ne);
