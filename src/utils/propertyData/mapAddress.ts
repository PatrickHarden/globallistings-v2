import { InjectedIntl } from 'react-intl';

import { Property } from '../../types/property';

export const mapAddress = (
  p: Property,
  intl: InjectedIntl,
  id: string = 'AddressSummary'
): string => {
  if (!p.address) {
    console.error(`Property ${p.id} has address missing`);
    return 'N/A';
  }

  return intl.formatMessage({ id }, { ...p.address });
};
