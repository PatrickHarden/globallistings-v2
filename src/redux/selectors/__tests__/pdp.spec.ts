import { propertyIdSelector, propertyDetailsSelector } from '../pdp';
import { DeepPartial } from 'redux';

import { State } from '../../../types/state';
import { Dictionary } from '../../../types/common/dictionary';

import i18nJson from '../../../tests/fixtures/store-i18n.json';

jest.mock('connected-react-router', () => ({
  createMatchSelector: () => () => ({ params: { propertyId: 'abc123' } }),
}));

const i18n = i18nJson as Dictionary<string>;

describe(propertyIdSelector, () => {
  it('should return a property Id', () => {
    const state: DeepPartial<State> = {};

    const result = propertyIdSelector(state as State);

    expect(result).toEqual('abc123');
  });
});

describe(propertyDetailsSelector, () => {
  it('should return a formatted property', () => {
    const state: DeepPartial<State> = {
      entities: {
        properties: {
          abc123: {
            id: 'abc123',
            photos: {
              hero: {
                large: 'mock_url',
                small: 'mock_url',
              },
            },
            address: {
              Line1: 'London Str 12',
              Line2: 'Block A',
              PostCode: 'N123FD',
              Locality: 'London',
            },
            description: {
              strapline: 'strapline',
              longDescription: 'longDescription',
            },
            highlights: ['foo bar'],
            size: {
              min: {
                amount: 200,
                units: 'sqft',
              },
              max: {
                amount: 3000,
                units: 'sqft',
              },
            },
            charges: [
              {
                currencyCode: 'EUR',
                chargeKind: 'Rent',
                amount: 200,
                perUnit: 'sqft',
                interval: 'year',
              },
            ],
            location: {
              lat: 0,
              lon: 0,
            },
          },
        },
        config: {
          language: 'en',
          i18n,
        },
      },
    };

    const result = propertyDetailsSelector(state as State);

    expect(result).toEqual({
      address: 'London Str 12, Block A, London, N123FD',
      description: {
        strapline: 'strapline',
        longDescription: 'longDescription',
      },
      id: 'abc123',
      imgUrl: 'mock_url',
      location: {
        lat: 0,
        lon: 0,
      },
      price: '€200.00/sqft/year',
      size: '200sqft - 3000sqft',
      specification: ['foo bar'],
    });
  });
});
