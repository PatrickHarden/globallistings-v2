import { InjectedIntl } from 'react-intl';
import { Property } from '../../types/property';

export const mapSpecification = (p: Property, intl: InjectedIntl) => {
  if (!p.highlights) {
    return undefined;
  }

  return p.highlights;
};
