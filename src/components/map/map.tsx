import * as React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { GoogleMap, withGoogleMap } from 'react-google-maps';

import { Location } from '../../types/property';
import { PropertyOverview } from '../../redux/selectors/property-search-results';
import { Area as AreaType } from '../../redux/selectors/area';
import { boundsToGoogleBounds } from '../../utils/bounds';

import { Loader } from '../loader/loader';
import { Area } from './area';
import MapMarker from './map-marker';

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const MapElement = styled.div`
  height: 100%;
`;

interface Props {
  readonly properties: PropertyOverview[];
  readonly area?: AreaType;
  readonly defaultZoom?: number;
  readonly onPinClicked?: (id: string) => void;
  readonly point?: Location;
}

const Map: React.SFC<Props> = ({ area, defaultZoom = 11, onPinClicked, point, properties }) => {
  const mapCentre = (area && area.center) || (point && { lat: point.lat, lng: point.lon });

  return (
    <div>
      <GoogleMap
        ref={map => map && area && map.fitBounds(boundsToGoogleBounds(area.bounds))}
        defaultCenter={mapCentre}
        defaultZoom={defaultZoom}
      >
        {area && area.type && <Area area={area} />}
        {properties.map(p => (
          <MapMarker
            key={p.id}
            property={p}
            onClick={() => (onPinClicked ? onPinClicked(p.id) : null)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default compose<Props, Props>(
  withProps({
    loadingElement: <Loader size="large" />,
    containerElement: <Container />,
    mapElement: <MapElement />,
  }),
  withGoogleMap
)(Map);
