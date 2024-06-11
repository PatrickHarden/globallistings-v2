import React, { FC } from 'react';
import styled from 'styled-components';

import { FilterOption, FilterModifier } from '../../types/config';
import { RangeFilterInfo } from '../../redux/selectors/config/filters';

import Select from '../select/select';

const Filter = styled(Select)``;

const FilterLabel = styled.label`
  flex: 1 100%;
`;

interface ContainerProps {
  readonly inline: boolean;
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: ${({ inline }) => (inline ? 'auto' : '100%')};

  ${Filter} {
    margin-left: ${({ inline }) => (inline ? '-1px' : '0')};
    width: calc(
      50%
        ${({ theme, inline }) =>
          inline ? '+ 1px' : `- ${parseInt(theme.gutter.m, undefined) / 2}em`}
    );
  }
`;

interface Props {
  readonly label?: string;
  readonly displayLabel: boolean;
  readonly filter: RangeFilterInfo;
  readonly handleChange: (key: string) => (val: string, modifier: FilterModifier) => void;
  readonly inline: boolean;
}

export const RangeFilter: FC<Props> = ({ displayLabel, filter, handleChange, inline }) => {
  const handleSelect = (item: FilterOption) =>
    handleChange(`${filter.name}_${item.type}`)(item.value, filter.modifier);

  return (
    <Container inline={inline}>
      {displayLabel && <FilterLabel>{filter.label}</FilterLabel>}
      <Filter
        {...filter.min}
        handleSelect={handleSelect}
        defaultToFirstValue={true}
        textEditable={false}
      />
      <Filter
        {...filter.max}
        handleSelect={handleSelect}
        defaultToFirstValue={true}
        textEditable={false}
      />
    </Container>
  );
};
