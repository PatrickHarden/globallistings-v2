import React, { FC } from 'react';
import styled from 'styled-components';
import { FilterInfo } from '../../redux/selectors/config/filters';
import { RangeFilter } from './range-filter';
import { SelectFilter } from './select-filter';
import { FilterModifier } from '../../types/config';

const Wrapper = styled.div``;

interface Props {
  readonly displayLabels: boolean;
  readonly filters: FilterInfo[];
  readonly handleChange: (key: string) => (val: string, modifier: FilterModifier) => void;
  readonly inline: boolean;
  readonly placement?: string;
  readonly className?: string;
}

const filterToKey = (filter: FilterInfo) => `${filter.type}-${filter.name}`;

export const Filters: FC<Props> = ({
  className,
  displayLabels,
  filters,
  handleChange,
  inline,
  placement,
}) => (
  <Wrapper className={className}>
    {filters
      .filter(filter => (placement ? filter.placement === placement : true))
      .map(filter => {
        switch (filter.type) {
          case 'select':
            return (
              <SelectFilter
                displayLabel={displayLabels}
                handleSelect={handleChange(filter.name)}
                inline={inline}
                filter={filter}
                key={filterToKey(filter)}
              />
            );
          case 'range':
            return (
              <RangeFilter
                displayLabel={displayLabels}
                filter={filter}
                key={filterToKey(filter)}
                handleChange={handleChange}
                inline={inline}
              />
            );
          default:
            console.error(`Unsupported filter type: ${filter.type}`);
            return null;
        }
      })}
  </Wrapper>
);
