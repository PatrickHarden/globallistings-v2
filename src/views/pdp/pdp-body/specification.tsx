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

interface Props {
  readonly heading: string;
  readonly specification?: string[];
}

export const PdpSpecification: React.SFC<Props> = ({ heading, specification }) => {
  if (!specification || !specification.length) {
    return null;
  }

  return (
    <Container>
      <Title>{heading}</Title>
      <ul>
        {specification.map((spec, i) => (
          <li key={`highlight${i}`}>{spec}</li>
        ))}
      </ul>
    </Container>
  );
};
