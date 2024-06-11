import { DeepPartial } from '../../../types/common/deep-partial';
import { State } from '../../../types/state';

import { suggestionsSelector, selectedSuggestionSelector } from '../ui';

describe(suggestionsSelector, () => {
  it('should return suggestions if they are present', () => {
    const state: DeepPartial<State> = {
      ui: {
        autocomplete: {
          searchTerm: 'ABC',
        },
      },
      entities: {
        autocomplete: {
          A1: {
            description: 'Mock A1',
          },
          A2: {
            description: 'Mock A2',
          },
          A3: {
            description: 'Mock A3',
          },
        },
        autocompleteSearches: ['A1', 'A2', 'A3'],
      },
    };

    const result = suggestionsSelector(state as State);

    expect(result).toEqual([
      { description: 'Mock A1' },
      { description: 'Mock A2' },
      { description: 'Mock A3' },
    ]);
  });
  it('should return an empty array if no search term is defined', () => {
    const state: DeepPartial<State> = {
      ui: {
        autocomplete: {
          searchTerm: undefined,
        },
      },
      entities: {
        autocomplete: {},
        autocompleteSearches: [],
      },
    };
    const result = suggestionsSelector(state as State);

    expect(result).toEqual([]);
  });

  it('should return an empty array if no suggestions are available for a search term', () => {
    const state: DeepPartial<State> = {
      ui: {
        autocomplete: {
          searchTerm: 'ABC',
        },
      },
      entities: {
        autocomplete: {},
        autocompleteSearches: [],
      },
    };
    const result = suggestionsSelector(state as State);

    expect(result).toEqual([]);
  });
});

describe(selectedSuggestionSelector, () => {
  it('should return undefined if no suggestion was selected', () => {
    const state: DeepPartial<State> = {
      ui: {
        autocomplete: {
          selectedSuggestionId: undefined,
        },
      },
      entities: {
        autocomplete: {},
        autocompleteSearches: [],
      },
    };

    const result = selectedSuggestionSelector(state as State);

    expect(result).toEqual(undefined);
  });

  it('should return undefined if no suggestion was selected', () => {
    const state: DeepPartial<State> = {
      ui: {
        autocomplete: {
          selectedSuggestionId: 'MOCK_ID',
        },
      },
      entities: {
        autocomplete: {
          MOCK_ID: {
            description: 'MOCK AUTOCOMPLETE',
          },
        },
      },
    };

    const result = selectedSuggestionSelector(state as State);

    expect(result).toEqual({ description: 'MOCK AUTOCOMPLETE' });
  });
});
