import React, { FC } from 'react';
import styled from 'styled-components';

import { SelectFilterInfo } from '../../redux/selectors/config/filters';
import { FilterModifier } from '../../types/config';

import Select from '../select/select';

interface FilterProps {
  readonly inline: boolean;
}
const Filter = styled(Select)<FilterProps>`
  margin-left: ${({ inline }) => (inline ? '-1px' : '0')};
`;

interface Props {
  readonly displayLabel: boolean;
  readonly filter: SelectFilterInfo;
  readonly handleSelect: (val: string, modifier: FilterModifier) => void;
  readonly inline: boolean;
}

export const SelectFilter: FC<Props> = ({ displayLabel, filter, handleSelect, inline }) => (
  <Filter
    {...filter}
    defaultToFirstValue={true}
    handleSelect={fo => handleSelect(fo.value, filter.modifier)}
    inline={inline}
    textEditable={false}
    labelText={displayLabel ? filter.label : undefined}
  />
);
