import { Dictionary } from './common/dictionary';

interface BaseConfig {
  readonly api: string;
  readonly bitlyToken: string;
  readonly breakpoints: Breakpoints;
  readonly cdnUrl: string;
  readonly filters: Filter[];
  readonly language: string;
  readonly largePlaceholderImageUrl: string;
  readonly mapMarkerIconUrl: string;
  readonly mapMarkerIconUrlInactive: string;
  readonly mediumPlaceholderImageUrl: string;
  readonly params: Params;
  readonly pdf: Pdf;
  readonly pdpContentDrivenBlock?: any;
  readonly pdpContentDrivenBlockLettings?: any;
  readonly placesAddressLookupStringFormat: string;
  readonly propertyContactApiUrl: string;
  readonly recaptchaKey: string;
  readonly searchConfig: SearchConfig;
  readonly searchLocationName?: string;
  readonly searchMode: string;
  readonly siteId: string;
  readonly siteType: string;
  readonly smallPlaceholderImageUrl: string;
  readonly tenantFeesLinkUrl?: string;
  readonly title: string;
  readonly urlPropertyAddressFormat: string;
  readonly currentConfig?: string;
  readonly limitListMapResults?: string;
  readonly otherConfigs?: OtherConfig[];
}

/**
 * These types should only be used by selectors and not by components directly
 * selectors need to output their own types
 */

export interface Config extends BaseConfig {
  readonly i18n: object;
}

export interface AppConfig extends BaseConfig {
  readonly i18n: Dictionary<string>;
}

export interface FilterOption {
  readonly value: string;
  readonly label: string;
  readonly default: boolean;
  readonly type?: string;
}

export enum FilterPlacement {
  group = 'lm_groupFilters',
  location = 'lm_locationFilter',
  primary = 'lm_primaryFilter',
  searchPrimary = 'primary',
  searchSecondary = 'secondary',
  secondary = 'lm_secondaryFilter',
  sort = 'lm_sortFilter',
  tertiary = 'lm_tertiaryFilters',
}

export enum FilterType {
  select = 'select',
  range = 'range',
}

export enum FilterModifier {
  query = 'query',
  url = 'url',
}

export type FilterCondition = { [K in keyof Params]?: string };

export interface BaseFilter {
  readonly placement: FilterPlacement;
  readonly modifier: FilterModifier;
  readonly name: string;
  readonly label: string;
  readonly conditional?: FilterCondition;
}

export interface SelectFilter extends BaseFilter {
  readonly options: FilterOption[];
  readonly type: FilterType.select;
}

export interface RangeFilter extends BaseFilter {
  readonly includePOA?: boolean;
  readonly maxValues: FilterOption[];
  readonly minValues: FilterOption[];
  readonly type: FilterType.range;
}

export type Filter = SelectFilter | RangeFilter;

interface Breakpoints {
  readonly xsmall: string;
  readonly small: string;
  readonly medium: string;
  readonly large: string;
}

interface Pdf {
  readonly staticMapApi: string;
  readonly pdfDownloadApi: string;
  readonly renderMiddleware: string;
}

export interface Params {
  readonly 'Common.Aspects': string;
  readonly 'Common.UsageType': string;
  readonly CurrencyCode: string;
  readonly 'Dynamic.TotalArea': string;
  readonly Interval: string;
  readonly PageSize: string;
  readonly RadiusType: string;
  readonly Site: string;
  readonly PropertyDefaultEnumerationSuffixes?: string[];
  readonly PropertyOrigins?: string[];
  readonly PropertyQualifier?: string;
  readonly Sort: string;
  readonly Unit: string;
}

export interface Polygon {
  coords: string,
  value: string,
  label: string,
  default?: boolean,
  name?: string
}

export interface SearchConfig {
  readonly searchResultsPage: string; // Can't be an empty string
  readonly searchHeaderLinkUrl?: string; // Can't be an empty string
  readonly searchBias?: SearchBias; // If it's defined biasRadius is compulsory
  readonly biasRadius?: number;
  readonly restrictToCountry?: string;
  readonly searchPlaceTypes?: string[]; // Can't be an empty array
  readonly allowAssumeZipCode?: boolean; // if this is present and true, then at 4-5 digits we add (regions) to types to eliminate IP location bias
  readonly searchPathSortAlphabetical?: boolean; // sort the search path selector alphabetically (i.e, property types)
  readonly searchHeader: SearchHeader;
  readonly hideSearchToBuy: boolean;
  readonly hideSearchToLet: boolean;
  readonly searchPathSelector?: SearchPath[]; // Can't be an empty array
  readonly propertyIdSearchPathSelector?: PropertyIdSearchPath[]; // Can't be an empty array
  readonly searchSuggestDebounce?: number;
  readonly polygons?: Polygon[];
}

export interface SearchPath {
  readonly value: string;
  readonly label: string;
  readonly default: boolean;
}

export interface PropertyIdSearchPath {
  readonly value: string;
  readonly label: string;
  readonly display?: string;
}

export interface SearchHeader {
  readonly searchHeaderTitleText?: string;
  readonly searchHeaderLinkText?: string;
  readonly searchHeaderLinkUrl?: string;
}

export interface SearchBias {
  readonly lat: string;
  readonly lon: string;
}

export interface LocationTypeDefinition {
  readonly name: string;
  readonly definitions: string[];
  readonly radius: number;
}

export interface OtherConfig {
  readonly name: string;
  readonly endpoint: string;
}

export enum TransactionTypeValue {
  isSale = 'isSale',
  isLetting = 'isLetting',
}

export enum DistanceUnit {
  miles = 'miles',
  km = 'km',
}
