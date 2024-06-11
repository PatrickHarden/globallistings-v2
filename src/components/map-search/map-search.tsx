import React, { FC } from 'react';
import debounce from 'lodash/debounce';

import Select from '../select/select';
import { MagnifyingGlass } from '../icons/magnifying-glass';
import poweredByGoogle from '../../assets/images/powered-by-google.png';
import { AutocompleteSuggestion } from '../../redux/selectors/search';

interface Props {
  readonly suggestions: AutocompleteSuggestion[];
  readonly handleSelect: (selection: string) => void;
  readonly handleInput: (searchTerm: string) => void;
  readonly initialSearchLocation?: string;
  readonly placeholder?: string;
  readonly searchSuggestDebounce?: number;
  readonly disableSponsor?: boolean;
  readonly openOnClick?: boolean;
}

const MapSearch: FC<Props> = ({
  handleInput,
  handleSelect,
  initialSearchLocation,
  placeholder,
  suggestions,
  searchSuggestDebounce,
  disableSponsor,
  openOnClick,
}) => (
  <Select
    autocomplete={true}
    handleSelect={s => handleSelect(s.value)}
    // Default searchSuggestDebounce to 300ms
    handleInput={debounce(handleInput, searchSuggestDebounce || 300)}
    highlightCurrentValue={true}
    icon={<MagnifyingGlass />}
    items={suggestions}
    placeholder={placeholder}
      sponsor={disableSponsor ? <span /> : <img src={poweredByGoogle} />}
    initialInputValue={initialSearchLocation}
      openOnClick={openOnClick ? openOnClick : false}
  />
);

export default MapSearch;
