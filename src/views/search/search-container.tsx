import React from 'react';
import { connect } from 'react-redux';
import {
  buyButtonInfoSelector,
  ButtonInfo,
  locationLookupSuggestionsSelector,
  AutocompleteSuggestion,
} from '../../redux/selectors/search';
import { letButtonInfoSelector } from '../../redux/selectors/search';
import { messagesSelector } from '../../redux/selectors/state';
import {
  searchModeSelector,
  searchBiasSelector,
  searchRadiusRestrictionSelector,
  searchCountryRestrictionSelector,
  getSearchHeader,
  searchResultsPageSelector,
  searchPathSelectorSelector,
  searchSuggestDebounceSelector,
  paramsSelector,
  searchPathSortAlphabeticalSelector,
  polygonSelector,
} from '../../redux/selectors/config/config';
import { FilterInfo } from '../../redux/selectors/config/filters';
import {
  primaryFiltersSelector,
  secondaryFiltersSelector,
} from '../../redux/selectors/view-filters';

import {
  setSearchLocation,
  changeSearchFilter
} from '../../redux/actions/search';
import { lookupPlaceByName } from '../../redux/actions/autocomplete-request';
import { lookupByPropertyId } from '../../redux/actions/property-request';

import { State } from '../../types/state';
import { SearchPath, SearchBias, SearchHeader, Params, Polygon } from '../../types/config';
import { Dictionary } from '../../types/common/dictionary';

import { Search } from './search';
import { selectedAutocompletionItem } from '../../redux/actions/autocomplete';
import { renderComplete } from '../../redux/actions/render';
import { siteTypeSelector } from '../../redux/selectors/config/config';

export interface StateProps {
  readonly params: Params;
  readonly biasRadius?: number;
  readonly buyButtonInfo: ButtonInfo;
  readonly language: Dictionary<string>;
  readonly letButtonInfo: ButtonInfo;
  readonly restrictToCountry?: string;
  readonly searchBias?: SearchBias;
  readonly searchHeader: SearchHeader;
  readonly searchMode: string;
  readonly searchResultsPage: string;
  readonly suggestions: AutocompleteSuggestion[];
  readonly searchPathSelectors?: SearchPath[];
  readonly primaryFilters: FilterInfo[];
  readonly secondaryFilters: FilterInfo[];
  readonly searchSuggestDebounce?: number;
  readonly searchPathSortAlphabeticalSelector?: boolean;
  readonly polygons?: Polygon[];
  readonly siteType: string
}

export interface DispatchProps {
  readonly changePlaceSearch: (searchTerm: string) => void;
  readonly changePropertySearch: (searchTerm: string) => void;
  readonly renderComplete: () => void;
  readonly changeSearchFilter: (key: string) => (value: string) => void;
  readonly setSearchLocation: (searchLocation: string) => void;
  readonly updateSearchPath: (searchPath: string) => void;
}

type Props = StateProps & DispatchProps;

export class SearchContainer extends React.Component<Props> {
  public componentDidMount() {
    this.props.renderComplete();
  }

  public render() {
    return <Search {...this.props} />;
  }
}

export const mapStateToProps = (state: State): StateProps => ({
  params: paramsSelector(state),
  biasRadius: searchRadiusRestrictionSelector(state),
  buyButtonInfo: buyButtonInfoSelector(state),
  language: messagesSelector(state),
  letButtonInfo: letButtonInfoSelector(state),
  restrictToCountry: searchCountryRestrictionSelector(state),
  searchBias: searchBiasSelector(state),
  searchHeader: getSearchHeader(state),
  searchMode: searchModeSelector(state),
  searchResultsPage: searchResultsPageSelector(state),
  suggestions: locationLookupSuggestionsSelector(state),
  searchPathSelectors: searchPathSelectorSelector(state),
  primaryFilters: primaryFiltersSelector(state),
  secondaryFilters: secondaryFiltersSelector(state),
  searchSuggestDebounce: searchSuggestDebounceSelector(state),
  searchPathSortAlphabeticalSelector: searchPathSortAlphabeticalSelector(state),
  polygons: polygonSelector(state),
  siteType: siteTypeSelector(state)
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  changePlaceSearch: searchTerm => dispatch(lookupPlaceByName(searchTerm)),
  changePropertySearch: searchTerm => dispatch(lookupByPropertyId(searchTerm)),
  changeSearchFilter: key => value => dispatch(changeSearchFilter({ [key]: value })),
  setSearchLocation: searchLocation => dispatch(selectedAutocompletionItem(searchLocation)),
  updateSearchPath: searchPath => dispatch(setSearchLocation(searchPath)),
  renderComplete: () => dispatch(renderComplete())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
