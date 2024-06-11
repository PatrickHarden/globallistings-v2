import { Dictionary } from './common/dictionary';

interface PropertyEntities {
  readonly properties: Dictionary<Property>;
}

export interface NormalisedSearchResult {
  readonly entities: PropertyEntities;
  readonly result: string[];
}
