import { normalize, schema } from 'normalizr';
import { NormalisedSearchResult } from '../../types/results';

import { PropertySearchConfig } from '../../redux/selectors/config/autocomplete-config';

import { compose, pickBy, isNil } from 'ramda';
import { docToProperty } from './doc-to-property-mapper';
import {
  NormalisedAutocompleteResult,
  Autocomplete,
  PropertyResult,
} from '../../types/autocomplete';
import { SearchPath } from '../../types/config';

const removeUndefinedPropsFromObj = pickBy((val, _) => !isNil(val));

const getProperties = (response: SearchResultsResponse) => response.Documents[0];

const mapProperties = (locale: string) => (docs: Document[]) =>
  docs
    .map(d => docToProperty(locale)(d))
    .filter(d => !!d)
    .map(removeUndefinedPropsFromObj);

export const normaliseApiResponse = (locale: string) => (
  data: SearchResultsResponse
): NormalisedSearchResult => {
  const properties = compose(
    mapProperties(locale),
    getProperties
  )(data);

  const propertySchema = new schema.Entity('properties');
  const propertiesSchema = new schema.Array(propertySchema);

  return normalize(properties, propertiesSchema);
};

export const normaliseAutocompleteResponse = (
  data: Autocomplete[]
): NormalisedAutocompleteResult => {
  const suggestionsEntitySchema = new schema.Entity('suggestions', {}, { idAttribute: 'placeId' });
  const suggestionsSchema = new schema.Array(suggestionsEntitySchema);

  return normalize(data, suggestionsSchema);
};

export const normaliseSearchResponse = (config: PropertySearchConfig) => (
  documents: any
): Autocomplete[] => {
  const suggestions: Autocomplete[] = documents.map((document: any) => {
    const primaryKey = document['Common.PrimaryKey'];
    const aspects = document['Common.Aspects'];
    const usageType = document['Common.UsageType'];

    const searchPath = config.SearchPaths!.find(path => path.label === usageType);

    const display = searchPath!.display || usageType;

    var suggestion = {
      description: `${primaryKey} (${display})`,
      placeId: `${primaryKey}`,
      propertyResult: {
        propertyPartialPath: `${primaryKey}`,
        propertyAspects: aspects,
        searchPath: `${searchPath!.value}`,
      },
    };
    return suggestion;
  });

  return suggestions;
};
