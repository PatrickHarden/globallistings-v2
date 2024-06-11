import { InjectedIntl } from 'react-intl';

import { Maybe } from '../../types/common/maybe';
import { Property } from '../../types/property';

export const mapSize = (p: Property, intl: InjectedIntl, isCommercial: boolean): Maybe<string> => {
  if (!isCommercial) {
    switch (p.numberOfBedrooms) {
      case 0:
        return intl.formatMessage({ id: 'Studio' });
      case 1:
        return intl.formatMessage(
          { id: 'NumberOfBedroomsSingular' },
          { bedroomCount: p.numberOfBedrooms }
        );
      default:
        return intl.formatMessage(
          { id: 'NumberOfBedroomsPlural' },
          { bedroomCount: p.numberOfBedrooms }
        );
    }
  }

  if (!p.size) {
    console.warn(`Commercial property ${p.id} has to have size defined`);
    return undefined;
  }

  const { min, max } = p.size;

  if (max.amount === min.amount) {
    return intl.formatMessage({ id: 'PropertySize' }, { size: min.amount, unit: min.units });
  }

  return intl.formatMessage(
    { id: 'PropertySizeRange' },
    {
      minimumSize: min.amount,
      totalSize: max.amount,
      unit: min.units,
    }
  );
};
