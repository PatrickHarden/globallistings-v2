import { RouterState } from 'connected-react-router';
import { Dictionary } from './common/dictionary';
import { Property } from './property';
import { Config, AppConfig } from './config';
import { UI } from './ui';
import { Autocomplete } from './autocomplete';

export interface State {
  readonly entities: Entities;
  readonly entitiesMeta: EntitiesMeta;
  readonly router: RouterState;
  readonly ui: UI;
}

export interface EntitiesMeta {
  readonly propertySearches: Dictionary<EntityMeta>;
  readonly geocode: Dictionary<EntityMeta>;
  readonly autocompleteSearches: Dictionary<EntityMeta>;
  readonly config: EntityMeta;
}

export type LoadStatus = 'PENDING' | 'ERROR' | 'SUCCESS' | 'NONE';

export interface EntityMeta {
  readonly status: LoadStatus;
}

export interface LatLng {
  readonly lat: number;
  readonly lng: number;
}

export interface Bounds {
  readonly sw: LatLng;
  readonly ne: LatLng;
}

export interface Geocode {
  readonly bounds: Bounds;
  readonly center: LatLng;
}

export interface Entities {
  readonly properties: Dictionary<Property>;
  readonly propertySearches: Dictionary<string[]>;
  readonly autocomplete: Dictionary<Autocomplete>;
  readonly autocompleteSearches: string[];
  readonly geocode: Dictionary<Geocode>;
  readonly config: AppConfig;
}

export function isConfigObject(config: string | Config): config is Config {
  return typeof config !== 'string';
}
