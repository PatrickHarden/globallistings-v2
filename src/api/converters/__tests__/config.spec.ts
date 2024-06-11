import { convert } from '../config';
import { Config } from '../../../types/config';
import { DeepPartial } from '../../../types/common/deep-partial';

describe(convert, () => {
  it('should correctly convert i18n', () => {
    const config: DeepPartial<Config> = {
      i18n: {
        one: 'uno',
        two: '%(two)s - dos',
        three: '%(three)s - tres %(three)s, (%(three)s)',
        nested: {
          four: '%(cuatro)s',
          moreNested: {
            five: '%(cinco)s',
          },
        },
      },
    };

    expect(convert(config as Config)).toMatchSnapshot();
  });

  it('should correctly overwrite defaults', () => {
    const config: DeepPartial<Config> = {
      i18n: {},
      searchConfig: {
        hideSearchToBuy: true,
        searchHeader: {
          searchHeaderTitleText: 'zap',
        },
        searchBias: {
          lat: '0',
          lon: '0',
        },
      },
    };

    expect(convert(config as Config)).toMatchSnapshot();
  });
});
