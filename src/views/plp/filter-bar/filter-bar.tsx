import * as React from 'react';
import styled from 'styled-components';
import MapSearch from '../../../components/map-search/map-search';
import { Filters } from '../../../components/filters/filters';
import { FilterInfo } from '../../../redux/selectors/config/filters';
import { AutocompleteSuggestion } from '../../../redux/selectors/search';
import { FilterModifier } from '../../../types/config';

const Container = styled.div`
  border-bottom: ${props => props.theme.borders.fine};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledFilters = styled(Filters)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const MapSearchWrapper = styled.div`
  flex: 2;
`;

const LocationSearchContainer = styled.div`
  display: flex;
  flex: 2;
`;

interface Props {
  readonly filters: FilterInfo[];
  readonly changePlaceSearch: (searchTerm: string) => void;
  readonly onFilterChange: (key: string) => (val: string, modifier: FilterModifier) => void;
  readonly onLocationChange: (value: string) => void;
  readonly suggestions: AutocompleteSuggestion[];
  readonly initialSearchLocation?: string;
}

export const FilterBar: React.SFC<Props> = ({
  changePlaceSearch,
  initialSearchLocation,
  filters,
  onFilterChange,
  onLocationChange,
  suggestions,
}) => (
  <Container>
    <LocationSearchContainer>
      <MapSearchWrapper>
        <MapSearch
          initialSearchLocation={initialSearchLocation}
          handleSelect={onLocationChange}
          handleInput={changePlaceSearch}
          suggestions={suggestions}
        />
      </MapSearchWrapper>
      <StyledFilters
        displayLabels={false}
        filters={filters}
        handleChange={onFilterChange}
        inline={true}
        placement={'lm_locationFilter'}
      />
    </LocationSearchContainer>

    <StyledFilters
      displayLabels={false}
      filters={filters}
      handleChange={onFilterChange}
      inline={true}
      placement={'lm_primaryFilter'}
    />

    <StyledFilters
      displayLabels={false}
      filters={filters}
      handleChange={onFilterChange}
      inline={true}
      placement={'lm_secondaryFilter'}
    />

    <StyledFilters
      displayLabels={false}
      filters={filters}
      handleChange={onFilterChange}
      inline={true}
      placement={'lm_tertiaryFilters'}
    />
  </Container>
);
