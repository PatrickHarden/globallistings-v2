import React from 'react';
import styled from 'styled-components';

import { PropertyList } from './property-list/property-list';
import { PropertyOverview } from '../../redux/selectors/property-search-results';
import Map from '../../components/map/map';
import { FilterBar } from './filter-bar/filter-bar';
import { FilterInfo } from '../../redux/selectors/config/filters';
import { AutocompleteSuggestion } from '../../redux/selectors/search';
import { FilterModifier } from '../../types/config';
import { Area } from '../../redux/selectors/area';

interface Props {
  readonly properties: PropertyOverview[];
  readonly filters: FilterInfo[];
  readonly changePlaceSearch: (searchTerm: string) => void;
  readonly goToProperty: (id: string) => void;
  readonly onFilterChange: (key: string) => (val: string, modifier: FilterModifier) => void;
  readonly onLocationChange: (value: string) => void;
  readonly resultCount: string;
  readonly suggestions: AutocompleteSuggestion[];
  readonly initialSearchLocation?: string;
  readonly area: Area;
  readonly onPinClicked: (id: string) => void;
  readonly onListPropertyEnter: (id: string) => void;
  readonly onListPropertyLeave: (id: string) => void;
}

const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: row;
  height: 100%;
`;

const StyledPropertyList = styled(PropertyList)`
  flex-basis: 450px;
  flex-shrink: 0;
`;

const RootContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PLP: React.SFC<Props> = ({
  changePlaceSearch,
  filters,
  goToProperty,
  onFilterChange,
  properties,
  suggestions,
  initialSearchLocation,
  onLocationChange,
  resultCount,
  area,
  onPinClicked,
  onListPropertyEnter,
  onListPropertyLeave,
}) => (
  <RootContainer>
    <FilterBar
      filters={filters}
      onFilterChange={onFilterChange}
      onLocationChange={onLocationChange}
      suggestions={suggestions}
      changePlaceSearch={changePlaceSearch}
      initialSearchLocation={initialSearchLocation}
    />
    <Container>
      <Map properties={properties} area={area} onPinClicked={onPinClicked} />
      <StyledPropertyList
        filters={filters}
        goToProperty={goToProperty}
        onFilterChange={onFilterChange}
        onListPropertyEnter={onListPropertyEnter}
        onListPropertyLeave={onListPropertyLeave}
        properties={properties}
        resultCount={resultCount}
      />
    </Container>
  </RootContainer>
);
