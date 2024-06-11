jest.mock('../location');
jest.mock('../../../utils/bounds');
jest.mock('../../../utils/haversine');

import { areaSelector } from '../area';
import { DeepPartial } from '../../../types/common/deep-partial';
import { State, Geocode, Bounds } from '../../../types/state';
import { plpLocationSelector, plpLocationRadiusSelector } from '../location';
import { googleBoundsToBounds } from '../../../utils/bounds';
import { haversineRadius } from '../../../utils/haversine';
import { FilterType } from '../../../types/config';

const geocode: Geocode = {
  bounds: {
    ne: {
      lat: 1,
      lng: 1,
    },
    sw: {
      lat: 2,
      lng: 2,
    },
  },
  center: {
    lat: 1,
    lng: 1,
  },
};

const bounds: Bounds = {
  sw: {
    lat: 3,
    lng: 3,
  },
  ne: {
    lat: 4,
    lng: 4,
  },
};

beforeEach(() => {
  ((plpLocationSelector as unknown) as jest.Mock).mockReturnValueOnce(geocode);
  ((googleBoundsToBounds as unknown) as jest.Mock).mockReturnValueOnce(bounds);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe(areaSelector, () => {
  it('with no radius in the url', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [],
        },
      },
      router: {
        location: {
          search: '',
        },
      },
    };

    const result = areaSelector(state as State);

    expect(result).toEqual({
      bounds: geocode.bounds,
      center: geocode.center,
      type: 'rectangle',
    });
  });

  it('with radius in the url', () => {
    // Arrange
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [{ name: 'radius', options: [{ value: '10' }] }],
        },
      },
      router: {
        location: {
          search: '?radius=10',
        },
      },
    };

    ((haversineRadius as unknown) as jest.Mock).mockReturnValueOnce(11);
    ((plpLocationRadiusSelector as unknown) as jest.Mock).mockReturnValueOnce('10');

    // Act
    const result = areaSelector(state as State);

    // Assert
    expect(result).toEqual({
      type: 'circle',
      bounds,
      center: geocode.center,
      radius: 11,
    });
  });

  it('with default radius filter', () => {
    // Arrange
    const state: DeepPartial<State> = {
      entities: {
        config: {
          filters: [
            { name: 'radius', type: FilterType.select, options: [{ value: '20', default: true }] },
          ],
        },
      },
      router: {
        location: {
          search: '',
        },
      },
    };

    ((plpLocationRadiusSelector as unknown) as jest.Mock).mockReturnValueOnce(undefined);
    ((haversineRadius as unknown) as jest.Mock).mockReturnValueOnce(11.2);
    // Act
    const result = areaSelector(state as State);

    // Assert

    expect(haversineRadius).toHaveBeenCalledWith(geocode.bounds, geocode.center, 20, 'miles');
    expect(result).toEqual({
      type: 'circle',
      bounds,
      center: geocode.center,
      radius: 11.2,
    });
  });
});
