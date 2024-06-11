import { createSelector } from 'reselect';
import { InjectedIntl } from 'react-intl';
import { propertiesSelector } from './state';
import { intlSelector } from './intl';
import { notEmpty } from '../../types/common/notEmpty';
import { Location, Property } from '../../types/property';
import { propertySearchSelector, usageTypeSelector } from './plp';
import { selectedPropertyPinSelector, highlightedPropertySelector } from './ui';
import { plpTransactionTypeSelector } from './location';

import { mapAddress } from '../../utils/propertyData/mapAddress';
import { mapImage } from '../../utils/propertyData/mapImage';
import { mapPrice } from '../../utils/propertyData/mapPrice';
import { mapSize } from '../../utils/propertyData/mapSize';
import { capitalise } from '../../utils/capitalise';

export interface PropertyOverview {
  readonly imgUrl: string;
  readonly price?: string;
  readonly size?: string;
  readonly address: string;
  readonly location: Location;
  readonly id: string;
  readonly selected: boolean;
}

// TODO update to a real one
export const isCommercialSelector = () => true;

const toPropertyOverview = (
  intl: InjectedIntl,
  isCommercial: boolean,
  selectedPropertyId: string,
  highlightedPropertyId: string
) => (p: Property, i: Number): PropertyOverview => ({
  address: mapAddress(p, intl),
  imgUrl: mapImage(p),
  price: mapPrice(p, intl),
  size: mapSize(p, intl, isCommercial),
  location: p.location,
  id: p.id,
  // Selected poperty = currently highlighted (mouseover list), selected (pin clicked) or first in array
  selected: highlightedPropertyId
    ? highlightedPropertyId === p.id
    : selectedPropertyId === p.id || i === 0,
});

export const propertiesSearchResultsSelector = createSelector(
  propertiesSelector,
  propertySearchSelector,
  intlSelector,
  isCommercialSelector,
  selectedPropertyPinSelector,
  highlightedPropertySelector,
  (properties, propertySearch, intl, isCommercial, selectedPropertyId, highlightedPropertyId) => {
    return propertySearch
      .map(p => properties[p])
      .filter(notEmpty)
      .map(toPropertyOverview(intl, isCommercial, selectedPropertyId, highlightedPropertyId));
  }
);

export const resultCountSelector = createSelector(
  propertiesSearchResultsSelector,
  usageTypeSelector,
  plpTransactionTypeSelector,
  intlSelector,
  (results, usage, transaction, { formatMessage }) =>
    formatMessage(
      { id: 'PropertiesFound' },
      {
        propertyCount: results.length,
        propertyTypePlural: formatMessage({
          id: `PDPPluralPropertyType${capitalise(usage)}`,
        }).toLocaleLowerCase(),
        searchType: formatMessage({
          id: transaction === 'sale' ? 'saleSearchType' : 'letSearchType',
        }),
      }
    )
);
