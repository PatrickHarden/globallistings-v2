import { Dictionary } from './common/dictionary';

export interface Autocomplete {
  readonly searchTerm: string;
  readonly selectedSuggestionId?: string;
}

export interface Search {
  readonly path?: string;
  readonly filters: Dictionary<string>;
}

export interface Map {
  readonly selectedPropertyPin: string;
}

export interface List {
  readonly highlightedProperty: string;
}

export interface UI {
  readonly autocomplete: Autocomplete;
  readonly search: Search;
  readonly render: Render;
  readonly map: Map;
  readonly list: List;
}

export interface Render {
  readonly complete: boolean;
}
export interface Event {
  readonly name: string;
  readonly detail: string;
}
