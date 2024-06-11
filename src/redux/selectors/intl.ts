import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { Dictionary } from '../../types/common/dictionary';
import { localeSelector, messagesSelector } from './state';

export const intlSelector = createSelector(
  localeSelector,
  messagesSelector,
  (locale: string, messages: Dictionary<string>) =>
    new IntlProvider({ locale, messages }).getChildContext().intl
);
