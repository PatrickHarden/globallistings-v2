import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${props => `${props.theme.gutter.m} ${props.theme.gutter.l}`};
  min-height: 45px;
  box-sizing: border-box;
  background-color: ${props => props.theme.colours.primary};
  display: flex;
`;

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 0;
  flex: 2;
  font-weight: ${props => props.theme.font.weight.normal};
  font-size: ${props => props.theme.font.size.l};
  color: ${props => props.theme.colours.light};
`;

const Link = styled.a`
  flex: 1;
  display: none;
  color: ${props => props.theme.colours.secondary};
  text-decoration: none;
  text-align: right;

  @media (min-width: ${props => props.theme.media.screen.s}) {
    display: block;
  }

  &:hover {
    color: ${props => props.theme.colours.light};
    text-decoration: none;
  }
`;

interface Props {
  readonly searchHeaderLinkText?: string;
  readonly searchHeaderLinkUrl?: string;
  readonly searchHeaderTitleText?: string;
}

const SearchHeader: FC<Props> = ({
  searchHeaderLinkText,
  searchHeaderLinkUrl,
  searchHeaderTitleText,
}) => {
  if (!searchHeaderLinkText && !searchHeaderLinkUrl && !searchHeaderTitleText) {
    return null;
  }

  return (
    <Container>
      {searchHeaderTitleText && <Title>{searchHeaderTitleText}</Title>}
      {searchHeaderLinkText && searchHeaderLinkUrl ? (
        <Link href={searchHeaderLinkUrl}>{searchHeaderLinkText}</Link>
      ) : null}
    </Container>
  );
};

export default SearchHeader;
