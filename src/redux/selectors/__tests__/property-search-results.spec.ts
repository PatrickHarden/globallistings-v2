jest.mock('murmurhash-js');
jest.mock('../match');
jest.mock('../../../utils/bounds');

import { DeepPartial } from '../../../types/common/deep-partial';
import { State } from '../../../types/state';
import { murmur2 } from 'murmurhash-js';
import { propertiesSearchResultsSelector, resultCountSelector } from '../property-search-results';
import i18nJson from '../../../tests/fixtures/store-i18n.json';
import { Dictionary } from '../../../types/common/dictionary';
import { plpQueryHashSelector, plpPropertyRequestStatus } from '../plp';
import { propertiesSearchRequestQuerySelector } from '../search-api-request';
import { googleBoundsToBounds } from '../../../utils/bounds';
import { plpUrlPathParamsSelector } from '../match';

const i18n = i18nJson as Dictionary<string>;
const MOCK_HASH = 'MOCK_HASH';
const murmurMock = murmur2 as jest.Mock;

const baseState: DeepPartial<State> = {
  entities: {
    config: {
      limitListMapResults: '100',
      params: {
        Sort: 'bam',
      },
      filters: [],
    },
    geocode: {
      london: {
        bounds: {
          ne: { lat: 1, lng: 2 },
          sw: { lat: 1, lng: 2 },
        },
        center: {
          lat: 1,
          lng: 2,
        },
      },
    },
  },
};

(googleBoundsToBounds as jest.Mock).mockReturnValue({
  ne: { lat: 1, lng: 1 },
  sw: { lat: 2, lng: 2 },
});

beforeEach(() => {
  ((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
    location: 'london',
    transactionType: 'sale',
    usageType: 'office',
  });
  (murmur2 as jest.Mock).mockReturnValue(MOCK_HASH);
});

describe(plpQueryHashSelector, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should merge config with query params', () => {
    // Arrange
    const state: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?radius=10' } },
    };

    // Act
    const result = plpQueryHashSelector(state as State);

    // Assert
    expect(result).toEqual(MOCK_HASH);
    expect(murmur2).toHaveBeenCalledWith(
      '{"PageSize":100,"Page":1,"Sort":"bam","radius":"10","Lat":1,"Lon":2,"Common.Aspects":"isSale"}'
    );
  });

  it('query should overwrite default config', () => {
    // Arrange
    const state: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?sort=zap' } },
    };

    // Act
    const result = plpQueryHashSelector(state as State);

    // Assert
    expect(murmur2).toHaveBeenCalledWith(
      '{"PageSize":100,"Page":1,"Sort":"zap","PolygonFilters":"[[\\"1,2\\",\\"1,2\\",\\"1,2\\",\\"1,2\\"]]","Common.Aspects":"isSale"}'
    );
    expect(result).toEqual(MOCK_HASH);
  });

  it('query params should not be affected by order', () => {
    // Arrange
    const state1: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?Site=uk&PageSize=1' } },
    };
    const state2: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?PageSize=1&Site=uk' } },
    };

    // Act
    plpQueryHashSelector(state1 as State);
    plpQueryHashSelector(state2 as State);

    // Assert
    expect(murmurMock.mock.calls[0][0]).toEqual(murmurMock.mock.calls[1][0]);
  });
});

describe(propertiesSearchRequestQuerySelector, () => {
  it('should generate a key for query param', () => {
    // Arrange
    const state: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?radius=5' } },
    };

    // Act
    const result = propertiesSearchRequestQuerySelector(state as State);

    // Assert
    expect(result).toEqual({
      'Common.Aspects': 'isSale',
      Lat: 1,
      Lon: 2,
      Page: 1,
      PageSize: 100,
      Sort: 'bam',
      radius: '5',
    });
  });

  it('should generate a key for query param and path for sale', () => {
    // Arrange
    ((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
      transactionType: 'sale',
      location: 'london',
    });
    const state: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?radius=5' } },
    };

    // Act
    const result = propertiesSearchRequestQuerySelector(state as State);

    // Assert
    expect(result).toEqual({
      'Common.Aspects': 'isSale',
      PageSize: 100,
      Page: 1,
      Lat: 1,
      Lon: 2,
      Sort: 'bam',
      radius: '5',
    });
  });

  it('should generate a key for query param and path for let', () => {
    // Arrange
    ((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
      transactionType: 'letting',
      location: 'london',
    });

    const state: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?radius=5' } },
    };

    // Act
    const result = propertiesSearchRequestQuerySelector(state as State);

    // Assert
    expect(result).toEqual({
      'Common.Aspects': 'isLetting',
      PageSize: 100,
      Page: 1,
      Lat: 1,
      Lon: 2,
      Sort: 'bam',
      radius: '5',
    });
  });

  it('should throw an exception for unrecognised usageType', () => {
    // Arrange
    ((plpUrlPathParamsSelector as unknown) as jest.Mock).mockReturnValue({
      transactionType: 'zap',
      location: 'london',
    });

    const state: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?radius=5' } },
    };

    // Assert
    expect(() => propertiesSearchRequestQuerySelector(state as State)).toThrowError();
  });
});

describe(plpPropertyRequestStatus, () => {
  it('should return NONE if no request has been made', () => {
    // Arrange
    const state: DeepPartial<State> = {
      ...baseState,
      router: { location: { search: '?Site=uk' } },
      entitiesMeta: {
        propertySearches: {
          [MOCK_HASH]: {
            status: 'PENDING',
          },
        },
      },
    };

    // Act
    const result = plpPropertyRequestStatus(state as State);

    // Assert
    expect(result).toEqual('PENDING');
  });
});

describe(propertiesSearchResultsSelector, () => {
  // Arrange
  const photos = {
    hero: {
      large: 'mock_url',
      small: 'mock_url',
    },
  };
  const state: DeepPartial<State> = {
    router: { location: { search: '?Site=uk' } },

    entities: {
      ...baseState.entities,
      config: {
        i18n,
        language: 'en-GB',
        filters: [],
      },
      properties: {
        P1: {
          address: {
            Line1: 'London Str 12',
            Line2: 'Block A',
          },
          photos,
          charges: [],
        },
        P2: {
          photos,
          address: {
            Line1: 'London Str 12',
            Line2: 'Block A',
            PostCode: 'N123FD',
            Locality: 'London',
          },
          size: {
            min: {
              amount: 200,
              units: 'sqft',
            },
            max: {
              amount: 200,
              units: 'sqft',
            },
          },
          charges: [],
        },
        P3: {
          photos,
          address: {
            Line1: 'London Str 12',
            Line2: 'Block A',
            PostCode: 'N123FD',
            Locality: 'London',
          },
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
              chargeKind: 'Rent',
              amount: 200,
              perUnit: 'sqft',
              interval: 'year',
            },
          ],
        },
      },
      propertySearches: {
        [MOCK_HASH]: ['P1', 'P2', 'P3'],
      },
    },
    ui: {
      map: {},
      list: {},
    },
  };

  it('should return correct data', () => {
    const result = propertiesSearchResultsSelector(state as State);
    expect(result).toMatchSnapshot();
  });

  it('should return correct data with a selected property', () => {
    const newState = {
      ...state,
      ui: {
        ...state.ui,
        map: {
          selectedPropertyPin: 'P1',
        },
      },
    };
    const result = propertiesSearchResultsSelector(newState as State);
    expect(result).toMatchSnapshot();
  });

  it('should return correct data with a highlighted property', () => {
    const newState = {
      ...state,
      ui: {
        ...state.ui,
        list: {
          highlightedProperty: 'P2',
        },
      },
    };
    const result = propertiesSearchResultsSelector(newState as State);
    expect(result).toMatchSnapshot();
  });
});

describe(resultCountSelector, () => {
  it('should return correctly formatted string', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [],
          language: 'en',
          i18n: {
            PDPPluralPropertyTypeOffice: 'Offices',
            PropertiesFound: '{propertyCount} matching {propertyTypePlural} for {searchType}',
            saleSearchType: 'sale',
          },
        },
        geocode: {
          london: {
            bounds: {
              ne: { lat: 1, lng: 2 },
              sw: { lat: 1, lng: 2 },
            },
            center: {
              lat: 1,
              lng: 2,
            },
          },
        },
        properties: {
          P1: {
            address: {
              Line1: 'London Str 1',
            },
            photos: {
              hero: {
                large: 'mock_url',
                small: 'mock_url',
              },
            },
          },
          P2: {
            address: {
              Line1: 'London Str 2',
            },
            photos: {
              hero: {
                large: 'mock_url',
                small: 'mock_url',
              },
            },
          },
        },
        propertySearches: {
          [MOCK_HASH]: ['P1', 'P2'],
        },
      },
      ui: {
        map: {},
        list: {},
      },
      router: {
        action: 'PUSH',
        location: {
          pathname: '/office/sale/london/results',
          search: '',
        },
      },
    };

    const result = resultCountSelector(state as State);

    expect(result).toEqual('2 matching offices for sale');
  });
});
