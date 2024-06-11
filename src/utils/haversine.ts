import { Bounds, LatLng } from '../types/state';
import { DistanceUnit } from '../types/config';

const distanceConversions = {
  miles: 1609.3,
  km: 1000,
};

const deg2rad = (deg: number) => deg * (Math.PI / 180);

const EARTH_RADIUS = 6371;

export const haversineRadius = (
  bounds: Bounds,
  centre: LatLng,
  radius: number,
  uom: DistanceUnit
) => {
  const { lat: neLat, lng: neLon } = bounds.ne;
  const { lat: centreLat, lng: centreLon } = centre;

  const dLat = deg2rad(neLat - centreLat); // deg2rad below
  const dLon = deg2rad(neLon - centreLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(centreLat)) *
      Math.cos(deg2rad(neLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS * c * 1000; // Distance in metres

  const calculatedRadius = d / distanceConversions[uom];

  return calculatedRadius + radius;
};
