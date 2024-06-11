import { mergeDeepLeft } from 'ramda';

import { theme as defaultTheme } from '../default/theme';

export const theme = mergeDeepLeft(
  {
    colours: {
      primary: '#5ca623',
    },
  },
  defaultTheme
);

export type Theme = typeof theme;
