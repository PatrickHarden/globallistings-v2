import React, { FC } from 'react';
import styled from 'styled-components';

import { ButtonInfo, AutocompleteSuggestion } from '../../redux/selectors/search';

import { SearchBias, SearchHeader, SearchPath, Polygon } from '../../types/config';
import { Dictionary } from '../../types/common/dictionary';

import SearchFilters from './search-filters/search-filters';
import SearchHeaderComponent from './search-header/search-header';
import SearchForm from './search-form/search-form';
import { FilterInfo } from '../../redux/selectors/config/filters';

const Container = styled.div``;

interface Props {
  readonly biasRadius?: number;
  readonly buyButtonInfo: ButtonInfo;
  readonly primaryFilters: FilterInfo[];
  readonly secondaryFilters: FilterInfo[];
  readonly language: Dictionary<string>;
  readonly letButtonInfo: ButtonInfo;
  readonly restrictToCountry?: string;
  readonly searchBias?: SearchBias;
  readonly searchHeader: SearchHeader;
  readonly searchMode: string;
  readonly searchResultsPage: string;
  readonly suggestions: AutocompleteSuggestion[];
  readonly changePlaceSearch: (searchTerm: string) => void;
  readonly changePropertySearch: (searchTerm: string) => void;
  readonly changeSearchFilter: (key: string) => (value: string) => void;
  readonly setSearchLocation: (searchLocation: string) => void;
  readonly updateSearchPath: (value: string) => void;
  readonly searchPathSelectors?: SearchPath[];
  readonly searchSuggestDebounce?: number;
  readonly polygons?: Polygon[];
  readonly siteType: string;
}

export const Search: FC<Props> = props => {
  const { changeSearchFilter, primaryFilters, searchHeader, secondaryFilters } = props;

  return (
    <Container>
      <SearchHeaderComponent {...searchHeader} />
      <SearchForm {...props} />
      <SearchFilters
        primaryFilters={primaryFilters}
        secondaryFilters={secondaryFilters}
        handleChange={changeSearchFilter}
      />
    </Container>
  );
};
