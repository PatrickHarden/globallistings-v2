import { Dictionary } from './common/dictionary';
import { Property } from './property';

// TODO remove the extra properties (except for isProperty) and move them into a property search interface to store in state
interface Autocomplete {
  readonly placeId: string;
  readonly description: string;
  readonly propertyResult?: PropertyResult;
}

interface PropertyResult {
  readonly propertyPartialPath?: string;
  readonly propertyAspects?: string[];
  readonly searchPath?: string;
}

interface NormalisedAutocompleteResult {
  readonly entities: AutocompleteEntities;
  readonly result: string[];
}

interface AutocompleteEntities {
  readonly suggestions: Dictionary<Autocomplete>;
}
