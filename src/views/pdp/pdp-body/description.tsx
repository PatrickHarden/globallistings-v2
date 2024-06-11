import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.gutter.m};
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colours.primary};
  font-size: ${({ theme }) => theme.font.size.s};
  text-transform: uppercase;
`;

const Description = styled.div`
  padding-top: ${({ theme }) => theme.gutter.s};
  font-size: ${({ theme }) => theme.font.size.s};
`;

const Strapline = styled.div`
  padding-top: ${({ theme }) => theme.gutter.s};
  font-size: ${({ theme }) => theme.font.size.l};
`;

interface Props {
  readonly heading: string;
  readonly strapline?: string;
  readonly longDescription?: string;
}

export const PdpDescription: React.SFC<Props> = ({ heading, longDescription, strapline }) => {
  if (!longDescription && !strapline) {
    return null;
  }

  return (
    <Container>
      <Title>{heading}</Title>
      {strapline && <Strapline>{strapline}</Strapline>}
      {longDescription && <Description>{longDescription}</Description>}
    </Container>
  );
};
