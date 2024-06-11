import { InjectedIntl } from 'react-intl';
import { Property } from '../../types/property';

export const mapPrice = (p: Property, intl: InjectedIntl) => {
  if (!p.charges) {
    return undefined;
  }
  const rent = p.charges.find(c => c.chargeKind === 'Rent');
  if (!rent || !rent.amount) {
    return intl.formatMessage({ id: 'PriceOnApplication' });
  }

  const { amount, perUnit, interval } = rent;

  if (!amount || !perUnit || !interval) {
    console.error(`${p.id} has rent info missing defaulting to price on application`);
    return intl.formatMessage({ id: 'PriceOnApplication' });
  }

  const amountStr = intl.formatNumber(rent.amount, {
    style: 'currency',
    currency: rent.currencyCode,
  });
  const unitStr = intl.formatMessage({ id: perUnit });
  const intervalStr = intl.formatMessage({ id: interval });

  return `${amountStr}/${unitStr}/${intervalStr}`;
};
