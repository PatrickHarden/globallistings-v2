import { State } from '../../../types/state';
import { DeepPartial } from 'redux';
import { SearchConfig } from '../../../types/config';
import { placeAutoCompleteConfig } from '../config/autocomplete-config';

const buildState = (searchConfig: DeepPartial<SearchConfig>): DeepPartial<State> => ({
  entities: {
    config: {
      searchConfig,
    },
  },
});

describe(placeAutoCompleteConfig, () => {
  it('if only country is present should give correct state', () => {
    const state = buildState({
      restrictToCountry: 'UK',
    });

    expect(placeAutoCompleteConfig(state as State)).toEqual({
      country: 'UK',
    });
  });

  it('if country and bias is present should give correct state', () => {
    const state = buildState({
      restrictToCountry: 'UK',
      biasRadius: 10,
      searchBias: {
        lat: '1',
        lon: '2',
      },
    });

    expect(placeAutoCompleteConfig(state as State)).toEqual({
      bias: { lat: 1, lng: 2, radius: 10 },
      country: 'UK',
    });
  });

  it('if bias radius is missing should throw', () => {
    const state = buildState({
      restrictToCountry: 'UK',
      searchBias: {
        lat: '1',
        lon: '2',
      },
    });

    expect(() => placeAutoCompleteConfig(state as State)).toThrowError(
      /bias and radius must be present/
    );
  });

  it('if bias is missing should throw', () => {
    const state = buildState({
      restrictToCountry: 'UK',
      biasRadius: 10,
    });

    expect(() => placeAutoCompleteConfig(state as State)).toThrowError(
      /bias and radius must be present/
    );
  });
});
