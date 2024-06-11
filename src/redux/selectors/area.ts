import { createSelector } from 'reselect';

import { Bounds, LatLng } from '../../types/state';
import { DistanceUnit } from '../../types/config';

import { googleBoundsToBounds } from '../../utils/bounds';
import { haversineRadius } from '../../utils/haversine';
import { paramsSelector } from './config/config';
import { defaultFiltersParamsSelectors } from './config/filters';

import { plpLocationRadiusSelector, plpLocationSelector, locationParamsSelector } from './location';

interface BaseArea {
  readonly bounds: Bounds;
  readonly center: LatLng;
}

export interface RectangleArea extends BaseArea {
  readonly type: 'rectangle';
}

export interface CircleArea extends BaseArea {
  readonly radius: number;
  readonly type: 'circle';
}

export type Area = RectangleArea | CircleArea;

const defaultRadiusSelector = createSelector(
  defaultFiltersParamsSelectors,
  ({ radius }) => {
    if (Array.isArray(radius)) {
      throw new Error('radius can not be an array');
    }

    return radius;
  }
);

const radiusSelector = createSelector(
  defaultRadiusSelector,
  plpLocationRadiusSelector,
  (defaultRadius, radius) => (radius ? radius : defaultRadius)
);

const radiusTypeSelector = createSelector(
  paramsSelector,
  params => (params && params.RadiusType === 'Kilometers' ? DistanceUnit.km : DistanceUnit.miles)
);

export const areaSelector = createSelector(
  radiusSelector,
  plpLocationSelector,
  radiusTypeSelector,
  (radius, location, radiusType): Area => {
    if (!radius || radius === '' || radius === '0') {
      return {
        type: 'rectangle',
        bounds: location.bounds,
        center: location.center,
      };
    }

    const resultRadius = haversineRadius(
      location.bounds,
      location.center,
      Number.parseFloat(radius),
      radiusType
    );

    const boundsCircle = new google.maps.Circle({
      center: location.center,
      radius: resultRadius * 1000,
    });

    return {
      type: 'circle',
      radius: resultRadius,
      bounds: googleBoundsToBounds(boundsCircle.getBounds()),
      center: location.center,
    };
  }
);
