import React from 'react';
import styled from 'styled-components';

import { ExplicitDictionary } from '../../types/common/dictionary';
import { PropertyDetails } from '../../redux/selectors/pdp';

import Map from '../../components/map/map';

import { PdpHeader } from './pdp-header/pdp-header';
import { PdpBody } from './pdp-body/pdp-body';

interface Props {
  readonly property: PropertyDetails;
  readonly sectionHeadings: ExplicitDictionary<string>;
}

const Container = styled.div`
  width: 1248px;
  max-width: 100%;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  height: 300px;
`;

export const PDP: React.SFC<Props> = ({ property, sectionHeadings }) => {
  const { address, price, size, ...details } = property;
  return (
    <Container>
      <PdpHeader address={address} price={price} size={size} />
      <PdpBody {...details} sectionHeadings={sectionHeadings} />
      <MapContainer>
        <Map
          defaultZoom={15}
          properties={[{ ...property, selected: false }]}
          point={property.location}
        />
      </MapContainer>
    </Container>
  );
};
