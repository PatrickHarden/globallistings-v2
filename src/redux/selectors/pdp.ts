import { createSelector } from 'reselect';
import { InjectedIntl } from 'react-intl';

import { pdpUrlPathParamsSelector, pdpMatchSelector } from './match';
import { propertiesSelector } from './state';
import { intlSelector } from './intl';
import { Location, Property, Description } from '../../types/property';

import { mapAddress } from '../../utils/propertyData/mapAddress';
import { mapImage } from '../../utils/propertyData/mapImage';
import { mapPrice } from '../../utils/propertyData/mapPrice';
import { mapSize } from '../../utils/propertyData/mapSize';
import { mapSpecification } from '../../utils/propertyData/mapSpecification';

import { isCommercialSelector } from './property-search-results';

export interface PropertyDetails {
  readonly address: string;
  readonly id: string;
  readonly imgUrl: string;
  readonly location: Location;
  readonly description?: Description;
  readonly price?: string;
  readonly size?: string;
  readonly specification?: string[];
}

const toPropertyDetails = (
  p: Property,
  intl: InjectedIntl,
  isCommercial: boolean
): PropertyDetails => ({
  address: mapAddress(p, intl, 'AddressSummaryLong'),
  description: p.description,
  id: p.id,
  imgUrl: mapImage(p),
  location: p.location,
  price: mapPrice(p, intl),
  size: mapSize(p, intl, isCommercial),
  specification: mapSpecification(p, intl),
});

export const propertyIdSelector = createSelector(
  pdpUrlPathParamsSelector,
  params => params.propertyId
);

export const propertySelector = createSelector(
  propertiesSelector,
  propertyIdSelector,
  (properties, id) => properties[id]
);

export const propertyDetailsSelector = createSelector(
  propertySelector,
  intlSelector,
  isCommercialSelector,
  (property, intl, isCommercial) => property && toPropertyDetails(property, intl, isCommercial)
);

export const sectionHeadingsSelector = createSelector(
  intlSelector,
  intl => ({
    details: intl.formatMessage({ id: 'OverviewTitle' }),
    specification: intl.formatMessage({ id: 'PdpSpecificationTitle' }),
  })
);

export const isPdpPath = createSelector(
  pdpMatchSelector,
  match => !!match
);
