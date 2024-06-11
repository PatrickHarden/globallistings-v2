import React, { FC, useState } from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';

import { ButtonInfo, AutocompleteSuggestion } from '../../../redux/selectors/search';

import MapSearch from '../../../components/map-search/map-search';

import Select from '../../../components/select/select';
import LinkButton from '../../../components/link-button/link-button';
import { ChevronRight } from '../../../components/icons/chevron-right';

import { SearchBias, SearchPath, Params, Polygon } from '../../../types/config';
import { Dictionary } from '../../../types/common/dictionary';

const Form = styled.form`
  padding: ${props => props.theme.gutter.l};
  background: rgba(245, 245, 245, 0.96);
  position: relative;
  z-index: 10;
`;

const Wrapper = styled.div`
  @media (min-width: ${props => props.theme.media.screen.s}) {
    display: flex;
  }
`;

const SearchPathSelectorContainer = styled.div`
  flex: 1;
  margin: 0 0 ${props => props.theme.gutter.s} 0;
  @media (min-width: ${props => props.theme.media.screen.s}) {
    margin: 0 ${props => props.theme.gutter.s} 0 0;
  }
`;

const SelectContainer = styled.div`
  flex: 3;
`;

// TODO: figure out why namespacer struggles with first css property
const singleButtonCss = css`
  foo: bar;
  margin: ${props => props.theme.gutter.m} 0 0 0;
  @media (min-width: ${props => props.theme.media.screen.s}) {
    margin: 0 0 0 ${props => props.theme.gutter.m};
  }
`;

const multiButtonCss = css`
  foo: bar;
  display: flex;
  margin-top: ${props => props.theme.gutter.m};
  a:first-child {
    margin-right: ${props => props.theme.gutter.s};
    @media (min-width: ${props => props.theme.media.screen.s}) {
      margin-right: ${props => props.theme.gutter.m};
    }
  }
`;

interface ButtonContainerProps {
  readonly singleButton?: boolean;
}
const ButtonContainer = styled.div<ButtonContainerProps>`
  ${({ singleButton }) => (singleButton ? singleButtonCss : multiButtonCss)}
  > a {
    flex: 1;
  }
`;

interface Props {
  readonly params?: Params;
  readonly biasRadius?: number;
  readonly buyButtonInfo: ButtonInfo;
  readonly language: Dictionary<string>; // TODO It should use React intl
  readonly letButtonInfo: ButtonInfo;
  readonly restrictToCountry?: string;
  readonly searchBias?: SearchBias;
  readonly suggestions: AutocompleteSuggestion[];
  readonly changePlaceSearch: (searchTerm: string) => void;
  readonly changePropertySearch: (searchTerm: string) => void;
  readonly updateSearchPath: (value: string) => void;
  readonly setSearchLocation: (searchLocation: string) => void;
  readonly searchPath?: string;
  readonly searchPathSelectors?: SearchPath[];
  readonly searchSuggestDebounce?: number;
  readonly searchPathSortAlphabeticalSelector?: boolean;
  readonly searchMode?: string;
  readonly polygons?: Polygon[];
  readonly siteType?: string;
}

const SearchForm: FC<Props> = ({
  params,
  buyButtonInfo,
  changePlaceSearch,
  changePropertySearch,
  language,
  letButtonInfo,
  setSearchLocation,
  updateSearchPath,
  suggestions,
  searchPathSelectors,
  searchSuggestDebounce,
  searchPathSortAlphabeticalSelector,
  searchMode,
  polygons,
  siteType
}) => {
  const { SearchLocationPlaceholder } = language;

  const hideBuyButton = !buyButtonInfo.visible;
  const hideLetButton = !letButtonInfo.visible;
  const singleButton = !(buyButtonInfo.visible && letButtonInfo.visible);
  const polygonArray: any[] = polygons ? polygons : [];
  const [polygonUrl, setPolygonUrl] = useState('');

  const checkInput = (term: string) => {
    const defaultRegex = '\\-\\d{8,}$';
    const propertyQualifier = params!.PropertyQualifier;
    const regex = propertyQualifier || defaultRegex;
    console.log(params)

    // CA-Plus-291860
    const isPropertyId: RegExp = new RegExp(regex, 'i');
    const isTest: RegExp = new RegExp('\\d{6,}.{0,}$', 'i')
    console.log(isPropertyId.test(term), isTest.test(term))

    if (isPropertyId.test(term)) {
      changePropertySearch(term);
    } else {
      changePlaceSearch(term);
    }
  };

  const handlePolygonSelection = (value: any) => {
    if (polygons) {
      polygons.forEach((polygon: Polygon) => {
        if (polygon.value) {
          if (polygon.value === value) {
            const parameters: any = {};
            const coordinates = JSON.stringify(polygon.coords);
            parameters.polygons = '%5B%5B' + coordinates.replace(/\\/g, '') + '%5D%5D';
            const urlString = createQueryString(parameters, true) || '';
            setPolygonUrl(urlString);
          }
        }
      });
    }
  };

  // v1 object params to url function
  const createQueryString = (obj: any, append: any) => {
    const query = Object.keys(obj)
      .filter(key => obj[key] !== '' && obj[key] !== null)
      .map(key => `${key}=` + encodeURIComponent(`${obj[key]}`))
      .join('&');

    return query.length > 0 ? `${append ? '&' : '?'}${query}` : null;
  };

  const renderButton = (info: ButtonInfo) => (
    <LinkButton
      href={info.url + (polygonUrl !== '' ? polygonUrl : '')}
      icon={<ChevronRight fill="#fff" />}
    >
      {info.text}
    </LinkButton>
  );

  const buttons = (
    <ButtonContainer singleButton={singleButton}>
      {!hideBuyButton && renderButton(buyButtonInfo)}
      {!hideLetButton && renderButton(letButtonInfo)}
    </ButtonContainer>
  );

  return (
    <Form>
      <Wrapper>
        {searchPathSelectors && !!searchPathSelectors.length && (
          <SearchPathSelectorContainer>
            <Select
              handleSelect={s => updateSearchPath(s.value)}
              items={searchPathSelectors}
              placeholder="Select..."
              textEditable={false}
              sortAlphabetical={searchPathSortAlphabeticalSelector}
            />
          </SearchPathSelectorContainer>
        )}

        <SelectContainer>
          {searchMode === 'polygon' ? (
            <MapSearch
              handleSelect={handlePolygonSelection}
              handleInput={() => null}
              suggestions={polygonArray}
              placeholder={SearchLocationPlaceholder}
              searchSuggestDebounce={searchSuggestDebounce}
              disableSponsor={true}
              openOnClick={true}
            />
          ) : (
            <MapSearch
              handleSelect={setSearchLocation}
              handleInput={checkInput}
              suggestions={suggestions}
              placeholder={SearchLocationPlaceholder}
              searchSuggestDebounce={searchSuggestDebounce}
            />
          )}
        </SelectContainer>

        {singleButton && buttons}
      </Wrapper>

      {!singleButton && buttons}
    </Form>
  );
};
export default SearchForm;
