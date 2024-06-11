import { createSelector } from 'reselect';
import { Dictionary } from '../../../types/common/dictionary';
import { PropertyIdSearchPath } from '../../../types/config';

import {
  paramsSelector,
  searchPathSelectorSelector,
  propertyIdPathSelectorSelector,
  searchBiasSelector,
  searchRadiusRestrictionSelector,
  searchCountryRestrictionSelector,
  searchTypesRestrictionSelector,
  assumeZipCodeSelector,
} from './config';
import { messagesSelector } from '../state';

export interface PropertySearchConfig {
  readonly Site: string;
  readonly PropertyOrigins?: string;
  readonly SearchPaths?: PropertyIdSearchPath[];
  readonly Messages?: Dictionary<string>;
}

export const propertySearchConfig = createSelector(
  paramsSelector,
  propertyIdPathSelectorSelector,
  (params, searchPaths): PropertySearchConfig => {
    return {
      Site: params.Site,
      PropertyOrigins: params.PropertyOrigins![0] || '',
      SearchPaths: searchPaths,
    };
  }
);

export interface AutocompleteConfig {
  readonly bias?: {
    readonly lat: number;
    readonly lng: number;
    readonly radius: number;
  };
  readonly country?: string;
  readonly types?: Array<string>;
  readonly allowAssumeZipCode?: boolean;
}

export const placeAutoCompleteConfig = createSelector(
  searchBiasSelector,
  searchRadiusRestrictionSelector,
  searchCountryRestrictionSelector,
  searchTypesRestrictionSelector,
  assumeZipCodeSelector,
  (bias, radius, country, types, allowAssumeZipCode): AutocompleteConfig => {
    // JS XOR logic
    if (bias ? !radius : radius) {
      throw new Error('Both bias and radius must be present in the config or none at all');
    }

    // TS doesn't correctly understand XOR so we have to check for both bias and radius
    if (!bias || !radius) {
      if (allowAssumeZipCode) {
        return { country, types, allowAssumeZipCode };
      } else {
        return { country, types };
      }
    }

    return {
      bias: {
        lat: Number.parseFloat(bias.lat),
        lng: Number.parseFloat(bias.lon),
        radius,
      },
      country,
      types,
      allowAssumeZipCode,
    };
  }
);
