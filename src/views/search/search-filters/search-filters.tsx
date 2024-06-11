import React, { FC } from 'react';
import styled from 'styled-components';

import { Filters } from '../../../components/filters/filters';
import { FilterInfo } from '../../../redux/selectors/config/filters';

const Wrapper = styled.div`
  display: none;
  @media (min-width: ${props => props.theme.media.screen.s}) {
    display: flex;
    background: rgba(245, 245, 245, 0.96);
    padding: 0 ${props => `${props.theme.gutter.m} ${props.theme.gutter.m}`};
  }
`;

const StyledFilters = styled(Filters)`
  width: 50%;
  box-sizing: border-box;
  padding: 0 ${props => props.theme.gutter.m};
`;

interface Props {
  readonly handleChange: (key: string) => (value: string) => void;
  readonly primaryFilters: FilterInfo[];
  readonly secondaryFilters: FilterInfo[];
}

const SearchFilters: FC<Props> = ({ handleChange, primaryFilters, secondaryFilters }) => {
  if (!primaryFilters.length && !secondaryFilters.length) {
    return null;
  }

  const props = {
    handleChange,
    displayLabels: true,
    inline: false,
  };

  return (
    <Wrapper>
      <StyledFilters {...props} filters={primaryFilters} />
      <StyledFilters {...props} filters={secondaryFilters} />
    </Wrapper>
  );
};

export default SearchFilters;
