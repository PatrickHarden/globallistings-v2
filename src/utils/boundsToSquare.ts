import { Bounds } from '../types/state';

const formatCoordinate = (lat: number, lng: number) => `${lat},${lng}`;

export const boundsToSquare = (bounds: Bounds) => {
  const { ne, sw } = bounds;

  return [
    formatCoordinate(ne.lat, ne.lng),
    formatCoordinate(sw.lat, ne.lng),
    formatCoordinate(sw.lat, sw.lng),
    formatCoordinate(ne.lat, sw.lng),
  ];
};
