import React from 'react';
import { connect } from 'react-redux';
import { Location } from 'history';
import { State, LoadStatus } from '../../types/state';
import { fetchProperties } from '../../redux/actions/searchProperties';
import { navigateToProperty } from '../../redux/actions/navigation';
import { PLP } from './plp';
import {
  PropertyOverview,
  propertiesSearchResultsSelector,
  resultCountSelector,
} from '../../redux/selectors/property-search-results';
import { FilterInfo } from '../../redux/selectors/config/filters';
import { conditionalFiltersSelector } from '../../redux/selectors/view-filters';
import { locationSelector } from '../../redux/selectors/state';

import { plpPropertyRequestStatus as plpPropertyRequestStatusSelector } from '../../redux/selectors/plp';
import {
  locationLookupSuggestionsSelector,
  initialSearchLocationSelector,
  AutocompleteSuggestion,
} from '../../redux/selectors/search';
import { lookupPlaceByName } from '../../redux/actions/autocomplete-request';
import { handleFilterChange } from '../../redux/actions/filter';
import { FilterModifier } from '../../types/config';
import { updateUrlWithSelectedLocation } from '../../redux/actions/autocomplete';
import { Area, areaSelector } from '../../redux/selectors/area';
import { onPinClicked } from '../../redux/actions/map';
import { onPropertyEnter, onPropertyLeave } from '../../redux/actions/list';

interface StateProps {
  readonly area: Area;
  readonly filters: FilterInfo[];
  readonly initialSearchLocation?: string;
  readonly location: Location;
  readonly properties: PropertyOverview[];
  readonly resultCount: string;
  readonly status: LoadStatus;
  readonly suggestions: AutocompleteSuggestion[];
}

interface DispatchProps {
  readonly changePlaceSearch: (searchTerm: string) => void;
  readonly fetchProperties: () => void;
  readonly goToProperty: (id: string) => void;
  readonly onFilterChange: (name: string) => (val: string, modifier: FilterModifier) => void;
  readonly onLocationChange: (value: string) => void;
  readonly onPinClicked: (id: string) => void;
  readonly onListPropertyEnter: (id: string) => void;
  readonly onListPropertyLeave: (id: string) => void;
}

type Props = StateProps & DispatchProps;

export class PlpContainer extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    const newSearch = this.props.location.search;
    const newPath = this.props.location.pathname;
    if (newSearch !== prevProps.location.search || newPath !== prevProps.location.pathname) {
      this.props.fetchProperties();
    }
  }

  public componentDidMount() {
    this.props.fetchProperties();
  }

  public render() {
    return <PLP {...this.props} />;
  }
}

export const mapStateToProps = (state: State): StateProps => ({
  area: areaSelector(state),
  filters: conditionalFiltersSelector(state),
  initialSearchLocation: initialSearchLocationSelector(state),
  location: locationSelector(state),
  properties: propertiesSearchResultsSelector(state),
  resultCount: resultCountSelector(state),
  status: plpPropertyRequestStatusSelector(state),
  suggestions: locationLookupSuggestionsSelector(state),
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  changePlaceSearch: (searchTerm: string) => dispatch(lookupPlaceByName(searchTerm)),
  fetchProperties: () => dispatch(fetchProperties()),
  goToProperty: (id: string) => dispatch(navigateToProperty(id)),
  onFilterChange: name => (val, modifier) => dispatch(handleFilterChange(name, val, modifier)),
  onLocationChange: (value: string) => dispatch(updateUrlWithSelectedLocation(value)),
  onPinClicked: (id: string) => dispatch(onPinClicked(id)),
  onListPropertyEnter: (id: string) => dispatch(onPropertyEnter(id)),
  onListPropertyLeave: (id: string) => dispatch(onPropertyLeave(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlpContainer);
