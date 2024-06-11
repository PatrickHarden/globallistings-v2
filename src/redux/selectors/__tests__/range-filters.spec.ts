import { filterParamsCombiner } from '../config/range-filters';
import { RangeFilter, FilterModifier, FilterPlacement, FilterType } from '../../../types/config';

describe(filterParamsCombiner, () => {
  it('should output empty object if no filters are present', () => {
    expect(filterParamsCombiner({}, [])).toEqual({});
  });

  it('should output empty object if no filters are present but params are', () => {
    expect(filterParamsCombiner({ foo: 'zap' }, [])).toEqual({});
  });

  it('with only min filter should return correct result', () => {
    const params = { price_min: '100' };
    const filters: RangeFilter[] = [
      {
        name: 'price',
        modifier: FilterModifier.query,
        label: 'price',
        placement: FilterPlacement.primary,
        type: FilterType.range,
        minValues: [{ value: '100', label: 'one hundred', default: false }],
        maxValues: [{ value: '1000', label: 'one thousand', default: false }],
      },
    ];
    expect(filterParamsCombiner(params, filters)).toEqual({ price: 'range[100||exclude]' });
  });

  it('with min filter and default max should return correct result', () => {
    const params = { price_min: '100' };
    const filters: RangeFilter[] = [
      {
        name: 'price',
        modifier: FilterModifier.query,
        label: 'price',
        placement: FilterPlacement.primary,
        type: FilterType.range,
        minValues: [{ value: '100', label: 'one hundred', default: false }],
        maxValues: [{ value: '1000', label: 'one thousand', default: true }],
      },
    ];
    expect(filterParamsCombiner(params, filters)).toEqual({ price: 'range[100|1000|exclude]' });
  });

  it('with default min and max and selected min and max should return correct result', () => {
    const params = { price_min: '200', price_max: '2000' };
    const filters: RangeFilter[] = [
      {
        name: 'price',
        modifier: FilterModifier.query,
        label: 'price',
        placement: FilterPlacement.primary,
        type: FilterType.range,
        minValues: [
          { value: '100', label: 'one hundred', default: true },
          { value: '200', label: 'two hundred', default: false },
        ],
        maxValues: [
          { value: '1000', label: 'one thousand', default: true },
          { value: '2000', label: 'two thousand', default: false },
        ],
      },
    ];
    expect(filterParamsCombiner(params, filters)).toEqual({ price: 'range[200|2000|exclude]' });
  });

  it('with default min and max should return correct result', () => {
    const params = {};
    const filters: RangeFilter[] = [
      {
        name: 'price',
        modifier: FilterModifier.query,
        label: 'price',
        placement: FilterPlacement.primary,
        type: FilterType.range,
        minValues: [
          { value: '100', label: 'one hundred', default: true },
          { value: '200', label: 'two hundred', default: false },
        ],
        maxValues: [
          { value: '1000', label: 'one thousand', default: true },
          { value: '2000', label: 'two thousand', default: false },
        ],
      },
    ];
    expect(filterParamsCombiner(params, filters)).toEqual({ price: 'range[100|1000|exclude]' });
  });

  it('with includePOA should return correct result', () => {
    const params = { price_min: '200', price_max: '2000' };
    const filters: RangeFilter[] = [
      {
        name: 'price',
        modifier: FilterModifier.query,
        label: 'price',
        placement: FilterPlacement.primary,
        type: FilterType.range,
        includePOA: true,
        minValues: [{ value: '200', label: 'two hundred', default: false }],
        maxValues: [{ value: '2000', label: 'two thousand', default: false }],
      },
    ];
    expect(filterParamsCombiner(params, filters)).toEqual({ price: 'range[200|2000|include]' });
  });

  it('with includePOA explicitly set to false should return correct result', () => {
    const params = { price_min: '200', price_max: '2000' };
    const filters: RangeFilter[] = [
      {
        name: 'price',
        modifier: FilterModifier.query,
        label: 'price',
        placement: FilterPlacement.primary,
        type: FilterType.range,
        includePOA: false,
        minValues: [{ value: '200', label: 'two hundred', default: false }],
        maxValues: [{ value: '2000', label: 'two thousand', default: false }],
      },
    ];
    expect(filterParamsCombiner(params, filters)).toEqual({ price: 'range[200|2000|exclude]' });
  });

  describe('Multiple param filters', () => {
    const rangeFilter: RangeFilter = {
      name: 'sizeArea|sizeTotal',
      modifier: FilterModifier.query,
      label: 'size',
      placement: FilterPlacement.primary,
      type: FilterType.range,
      includePOA: false,
      minValues: [
        { value: '100', label: 'one hundred', default: false },
        { value: '200', label: 'two hundred', default: false },
        { value: '300', label: 'three hundred', default: false },
      ],
      maxValues: [
        { value: '2000', label: 'two thousand', default: false },
        { value: '1000', label: 'one thousand', default: false },
        { value: '3000', label: 'three thousand', default: false },
      ],
    };

    it('generates the correct response when only a min value is selected', () => {
      const params = {
        'sizeArea|sizeTotal_min': '200',
      };
      const filters: RangeFilter[] = [rangeFilter];

      expect(filterParamsCombiner(params, filters)).toEqual({
        sizeTotal: 'range[200||exclude]',
      });
    });

    it('generates the correct response when only a max value is selected', () => {
      const params = {
        'sizeArea|sizeTotal_max': '2000',
      };
      const filters: RangeFilter[] = [rangeFilter];

      expect(filterParamsCombiner(params, filters)).toEqual({
        sizeArea: 'range[|2000|exclude]',
      });
    });

    it('generates the correct response when both min and max values are selected', () => {
      const params = {
        'sizeArea|sizeTotal_min': '200',
        'sizeArea|sizeTotal_max': '2000',
      };
      const filters: RangeFilter[] = [rangeFilter];

      expect(filterParamsCombiner(params, filters)).toEqual({
        sizeArea: 'range[|2000|exclude]',
        sizeTotal: 'range[200||exclude]',
      });
    });
  });
});
