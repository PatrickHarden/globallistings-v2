import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.gutter.m};
`;

const LeftColumn = styled.div`
  width: calc(${({ theme }) => theme.layout.columns.l} - ${({ theme }) => theme.gutter.m});
  flex: 2;
`;

const RightColumn = styled.div`
  width: ${({ theme }) => theme.layout.columns.r};
  margin-left: ${({ theme }) => theme.gutter.m};
  text-align: right;
`;

const Address = styled.div`
  font-size: ${({ theme }) => theme.font.size.xl};
  width: 50%;
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.font.size.l};
  color: ${({ theme }) => theme.colours.primary};
`;

const Size = styled.span`
  font-size: ${({ theme }) => theme.font.size.l};
`;

interface Props {
  readonly address: string;
  readonly price?: string;
  readonly size?: string;
}

export const PdpHeader: React.SFC<Props> = ({ address, price, size }) => {
  return (
    <Container>
      <LeftColumn>
        <Address>{address}</Address>
      </LeftColumn>
      {(price || size) && (
        <RightColumn>
          {price && <Price>{price}, </Price>}
          {size && <Size>{size}</Size>}
        </RightColumn>
      )}
    </Container>
  );
};
