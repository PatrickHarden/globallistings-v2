import * as React from 'react';
import { Circle, Rectangle } from 'react-google-maps';

import * as plp from '../../redux/selectors/plp';
import { Area as AreaType } from '../../redux/selectors/area';

import { boundsToGoogleBounds } from '../../utils/bounds';

interface Props {
  readonly area?: AreaType;
}

const options = {
  fillColor: 'rgb(0, 107, 76, 30)',
  strokeColor: 'rgb(0, 107, 76)',
  strokeWeight: 1,
};

export const Area: React.SFC<Props> = ({ area }) => {
  if (!area) {
    return null;
  }

  switch (area.type) {
    case 'circle':
      return <Circle center={area.center} radius={area.radius * 1000} options={options} />;
    case 'rectangle':
      return <Rectangle bounds={boundsToGoogleBounds(area.bounds)} options={options} />;
    default:
      throw new Error('Unsupported Area Type');
  }
};
