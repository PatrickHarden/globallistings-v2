import React from 'react';
import styled from 'styled-components';

import { PropertyOverview } from '../../../redux/selectors/property-search-results';
import { FilterInfo } from '../../../redux/selectors/config/filters';
import { FilterModifier } from '../../../types/config';
import { List, ListRowRenderer, AutoSizer } from 'react-virtualized';
import { findIndex } from 'ramda';

import { Filters } from '../../../components/filters/filters';
import { PropertyCard } from '../../../components/property-card/property-card';

interface Props {
  readonly filters: FilterInfo[];
  readonly goToProperty: (id: string) => void;
  readonly onFilterChange: (key: string) => (val: string, modifier: FilterModifier) => void;
  readonly onListPropertyEnter: (id: string) => void;
  readonly onListPropertyLeave: (id: string) => void;
  readonly properties: PropertyOverview[];
  readonly resultCount: string;
  readonly className?: string;
}

const StyledPropertyCard = styled(PropertyCard)`
  margin: ${({ theme }) => theme.gutter.s};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ResultCount = styled.span`
  margin-left: ${({ theme }) => theme.gutter.s};
  margin-top: ${({ theme }) => theme.gutter.l};
  color: ${({ theme }) => theme.colours.primary};
`;

const SortFilter = styled(Filters)`
  width: 40%;
  margin: ${({ theme }) => theme.gutter.s};
`;

const ListContainer = styled.div`
  height: 100%;
  div:focus {
    outline: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PropertyList: React.SFC<Props> = ({
  className,
  filters,
  goToProperty,
  onFilterChange,
  properties,
  resultCount,
  onListPropertyEnter,
  onListPropertyLeave,
}) => {
  const selectedPropertyIndex = findIndex(p => p.selected, properties);
  const renderRow: ListRowRenderer = ({ key, index, style }) => (
    <div style={style} key={key}>
      <StyledPropertyCard
        {...properties[index]}
        handleClick={goToProperty}
        handleMouseEnter={id => onListPropertyEnter(id)}
        handleMouseLeave={id => onListPropertyLeave(id)}
      />
    </div>
  );

  return (
    <Container className={className}>
      <Header>
        <ResultCount>{resultCount}</ResultCount>
        <SortFilter
          displayLabels={false}
          filters={filters}
          handleChange={onFilterChange}
          inline={false}
          placement={'lm_sortFilter'}
        />
      </Header>

      <ListContainer>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowHeight={140.8} // TODO pass the theme here and calculate the height
              width={width}
              rowCount={properties.length}
              rowRenderer={renderRow}
              scrollToIndex={selectedPropertyIndex}
            />
          )}
        </AutoSizer>
      </ListContainer>
    </Container>
  );
};
