import { searchPathSelector, searchLinkSelector, v1FilterParamsSelector } from '../search';
import { DeepPartial } from '../../../types/common/deep-partial';
import { State } from '../../../types/state';
import {
  SearchPath,
  FilterType,
  SelectFilter,
  FilterPlacement,
  FilterModifier,
  TransactionTypeValue,
} from '../../../types/config';

describe(searchPathSelector, () => {
  it('should return undefined in there are no searchPaths', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          searchConfig: {
            searchPathSelector: undefined,
          },
        },
      },
      ui: {
        search: {},
      },
    };

    expect(searchPathSelector(state as State)).toEqual(undefined);
  });

  it('should throw an exception if there is no default searchPath', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          searchConfig: {
            searchPathSelector: [
              {
                value: 'zap',
                label: 'boom',
                default: false,
              },
            ],
          },
        },
      },
      ui: {
        search: {},
      },
    };

    expect(() => searchPathSelector(state as State)).toThrowError(/there must always be a default/);
  });

  it('should choose UI path over searchPathSelector', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          searchConfig: {
            searchPathSelector: [
              {
                value: 'zap',
                label: 'zap',
                default: false,
              },
              {
                value: 'foo',
                label: 'foo',
                default: true,
              },
            ],
          },
        },
      },
      ui: {
        search: {
          path: 'zap',
        },
      },
    };

    const result = searchPathSelector(state as State);

    expect(result).toEqual('zap');
  });

  it('should choose default searchPathSelector if no UI present', () => {
    const state: DeepPartial<State> = {
      entities: {
        config: {
          searchConfig: {
            searchPathSelector: [
              {
                value: 'zap',
                label: 'zap',
                default: false,
              },
              {
                value: 'foo',
                label: 'foo',
                default: true,
              },
            ],
          },
        },
      },
      ui: {
        search: {},
      },
    };

    const result = searchPathSelector(state as State);

    expect(result).toEqual('foo');
  });
});

describe(searchLinkSelector, () => {
  describe('letting', () => {
    it('should throw an error if no default path is present of selectPaths', () => {
      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {},
          },
        },
        ui: { autocomplete: {}, search: {} },
      };

      expect(() =>
        searchLinkSelector(TransactionTypeValue.isLetting)(state as State)
      ).toThrowError();
    });

    it('should throw if selectors are an empty array', () => {
      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {
              searchPathSelector: [],
            },
            filters: [],
          },
        },
        ui: { autocomplete: {}, search: {} },
      };

      expect(() =>
        searchLinkSelector(TransactionTypeValue.isLetting)(state as State)
      ).toThrowError();
    });

    it('should create a correct link if only a default selector is present', () => {
      const searchPath: SearchPath = {
        default: true,
        value: 'zap',
        label: 'sample_label',
      };
      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {
              searchPathSelector: [searchPath],
            },
            filters: [],
          },
        },
        ui: { autocomplete: {}, search: {} },
      };

      const result = searchLinkSelector(TransactionTypeValue.isLetting)(state as State);

      expect(result).toEqual('zap?aspects=isLetting');
    });

    it('should create a correct link for a selected location', () => {
      const searchPath: SearchPath = {
        default: true,
        value: 'zap',
        label: 'sample_label',
      };
      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {
              searchPathSelector: [searchPath],
            },
            filters: [],
          },
          autocomplete: {
            ID_1: {
              description: 'MOCK',
              placeId: 'MOCK_PLACE_ID',
            },
          },
        },
        ui: { autocomplete: { selectedSuggestionId: 'ID_1' }, search: {} },
      };

      const result = searchLinkSelector(TransactionTypeValue.isLetting)(state as State);

      expect(result).toEqual('zap?placeId=MOCK_PLACE_ID&location=MOCK&aspects=isLetting');
    });

    it('should create a correct link if searchPath is selected', () => {
      const searchPath: SearchPath = {
        default: true,
        value: 'zap',
        label: 'sample_label',
      };
      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {
              searchPathSelector: [searchPath],
            },
            filters: [],
          },
        },
        ui: {
          autocomplete: {},
          search: {
            path: 'bam',
          },
        },
      };

      const result = searchLinkSelector(TransactionTypeValue.isLetting)(state as State);

      expect(result).toEqual('bam?aspects=isLetting');
    });

    it('should create a correct link if with default filters', () => {
      const searchPath: SearchPath = {
        default: true,
        value: 'zap',
        label: 'sample_label',
      };

      const selectFilter: SelectFilter = {
        type: FilterType.select,
        placement: FilterPlacement.primary,
        label: 'select radius',
        name: 'radius',
        modifier: FilterModifier.query,
        options: [
          {
            default: true,
            value: '5',
            label: '5 km',
          },
        ],
      };

      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {
              searchPathSelector: [searchPath],
            },
            filters: [selectFilter],
          },
        },
        ui: {
          autocomplete: {},
          search: {
            path: 'bam',
            filters: {},
          },
        },
      };

      const result = searchLinkSelector(TransactionTypeValue.isLetting)(state as State);

      expect(result).toEqual('bam?radius=5&aspects=isLetting');
    });

    it('should create a correct link if with default filters and user selected', () => {
      const searchPath: SearchPath = {
        default: true,
        value: 'zap',
        label: 'sample_label',
      };

      const selectFilter: SelectFilter = {
        type: FilterType.select,
        placement: FilterPlacement.primary,
        label: 'select radius',
        name: 'radius',
        modifier: FilterModifier.query,
        options: [
          {
            default: true,
            value: '5',
            label: '5 km',
          },
        ],
      };

      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {
              searchPathSelector: [searchPath],
            },
            filters: [selectFilter],
          },
        },
        ui: {
          autocomplete: {},
          search: {
            path: 'bam',
            filters: {
              area: 'a',
            },
          },
        },
      };

      const result = searchLinkSelector(TransactionTypeValue.isLetting)(state as State);

      expect(result).toEqual('bam?radius=5&area=a&aspects=isLetting');
    });
  });

  describe('sale', () => {
    it('should create a correct link if only a default selector is present', () => {
      const searchPath: SearchPath = {
        default: true,
        value: 'zap',
        label: 'sample_label',
      };
      const state: DeepPartial<State> = {
        entities: {
          config: {
            searchConfig: {
              searchPathSelector: [searchPath],
            },
            filters: [],
          },
        },
        ui: { autocomplete: {}, search: {} },
      };

      const result = searchLinkSelector(TransactionTypeValue.isSale)(state as State);

      expect(result).toEqual('zap?aspects=isSale');
    });
  });
});

describe(v1FilterParamsSelector, () => {
  let state: DeepPartial<State>;
  beforeEach(() => {
    state = {
      entities: {
        config: {
          filters: [],
        },
      },
      ui: {
        search: {
          filters: {},
        },
      },
    };
  });

  it('should return an empty object if there are no params', () => {
    const testState: DeepPartial<State> = {
      ...state,
    };

    expect(v1FilterParamsSelector(testState as State)).toEqual({});
  });

  it('should return an untouched param object if there are no range filters', () => {
    const testState: DeepPartial<State> = {
      ...state,
      ui: {
        search: {
          filters: {
            foo: 'bar',
          },
        },
      },
    };

    expect(v1FilterParamsSelector(testState as State)).toEqual({ foo: 'bar' });
  });

  it('should throw an error if no corresponding filters are present in the config', () => {
    const testState: DeepPartial<State> = {
      ...state,
      ui: {
        search: {
          filters: {
            foo_min: '1',
            foo_max: '2',
            'bar|baz_min': '3',
            'bar|baz_max': '4',
          },
        },
      },
    };

    expect(() => v1FilterParamsSelector(testState as State)).toThrow();
  });

  it('should set the include POA flag to include if the filter has the includePOA flag', () => {
    const testState: DeepPartial<State> = {
      ...state,
      entities: {
        config: {
          filters: [
            {
              name: 'foo',
              includePOA: true,
              type: FilterType.range,
              maxValues: [],
              minValues: [],
            },
          ],
        },
      },
      ui: {
        search: {
          filters: {
            foo_min: '1',
            foo_max: '2',
          },
        },
      },
    };

    expect(v1FilterParamsSelector(testState as State)).toEqual({
      foo: 'range[1|2|include]',
    });
  });

  it('should not include null filters', () => {
    const testState: DeepPartial<State> = {
      ...state,
      ui: {
        search: {
          filters: {
            baz: null,
          },
        },
      },
    };

    expect(v1FilterParamsSelector(testState as State)).toEqual({});
  });
});
