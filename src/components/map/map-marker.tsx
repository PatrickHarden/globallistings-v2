import React, { FC } from 'react';
import styled, { withTheme } from 'styled-components';
import { Marker } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import { PropertyOverview } from '../../redux/selectors/property-search-results';

const Label = styled.div`
  background: ${({ theme }) => theme.colours.light};
  border: ${({ theme }) => theme.borders.thick};
  box-shadow: ${({ theme }) => theme.shadow.light};
  color: ${({ theme }) => theme.colours.primary};
  padding: ${({ theme }) => theme.gutter.s};
`;

interface Props {
  readonly onClick: () => void;
  readonly property: PropertyOverview;
  readonly theme: any;
}

const MapMarker: FC<Props> = ({ onClick, property, theme }) => {
  const {
    id,
    location: { lat, lon: lng },
    selected,
  } = property;
  const MarkerComponent = selected ? MarkerWithLabel : Marker;

  return (
    <MarkerComponent
      defaultZIndex={9999}
      icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjkiIGhlaWdodD0iMzUiPjxpbWFnZSB3aWR0aD0iMjkiIGhlaWdodD0iMzUiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0OGMzWm5JSGRwWkhSb1BTSTBOSEI0SWlCb1pXbG5hSFE5SWpVemNIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBME5DQTFNeUlnZG1WeWMybHZiajBpTVM0eElpQjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIaHRiRzV6T25oc2FXNXJQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySWo0Z0lDQWdQR2NnYVdROUlsTjViV0p2YkhNaUlITjBjbTlyWlQwaWJtOXVaU0lnYzNSeWIydGxMWGRwWkhSb1BTSXhJaUJtYVd4c1BTSnViMjVsSWlCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaVBpQWdJQ0FnSUNBZ1BHY2dhV1E5SWsxcGMyTXZUV0Z3TDFCcGJpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTFRFd0xqQXdNREF3TUN3Z0xUWXVNREF3TURBd0tTSWdabWxzYkQwaUl6QXdOa0UwUkNJK0lDQWdJQ0FnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVE15TERVNUlFTXhOeTR6TXpNek16TXpMRFEyTGpRek16VXdPVGNnTVRBc016WXVNVEF3TVRjMk15QXhNQ3d5T0NCRE1UQXNNVFV1T0RRNU56TTFOU0F4T1M0NE5EazNNelUxTERZZ016SXNOaUJETkRRdU1UVXdNalkwTlN3MklEVTBMREUxTGpnME9UY3pOVFVnTlRRc01qZ2dRelUwTERNMkxqRXdNREUzTmpNZ05EWXVOalkyTmpZMk55dzBOaTQwTXpNMU1EazNJRE15TERVNUlGb2dUVE15TERNNUlFTXpPQzR3TnpVeE16SXlMRE01SURRekxETTBMakEzTlRFek1qSWdORE1zTWpnZ1F6UXpMREl4TGpreU5EZzJOemdnTXpndU1EYzFNVE15TWl3eE55QXpNaXd4TnlCRE1qVXVPVEkwT0RZM09Dd3hOeUF5TVN3eU1TNDVNalE0TmpjNElESXhMREk0SUVNeU1Td3pOQzR3TnpVeE16SXlJREkxTGpreU5EZzJOemdzTXprZ016SXNNemtnV2lJZ2FXUTlJbTFoY0Mxd2FXNGlQand2Y0dGMGFENGdJQ0FnSUNBZ0lEd3ZaejRnSUNBZ1BDOW5Qand2YzNablBnPT0iLz48L3N2Zz4="
      labelAnchor={new google.maps.Point(-10, 75)}
      onClick={onClick}
      position={{ lat, lng }}
    >
      <Label theme={theme}>{id}</Label>
    </MarkerComponent>
  );
};

export default withTheme(MapMarker);
