import { mapObjIndexed } from 'ramda';
import { Config } from '../../types/config';
import flattenObject from '../../utils/flattenObj';

const replaceIntlChars = mapObjIndexed((_, key, obj) =>
  obj[key].replace(/%\(/g, '{').replace(/\)s/g, '}')
);

const convertToIntl = (messages: object) => replaceIntlChars(messages);

// TODO this should leave outside API folder as this is not an API layer anymore and just a transformation layer
export const convert = (config: Config): Config => ({
  ...config,
  i18n: convertToIntl(flattenObject(config.i18n)),
});
