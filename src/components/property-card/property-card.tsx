import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { PropertyOverview } from '../../redux/selectors/property-search-results';
import { ResponsiveImage } from '../responsive-image/responsive-image';

interface CardContainerProps {
  readonly clickable: boolean;
  readonly selected: boolean;
}

const CardContainer = styled.div<CardContainerProps>`
  background: ${({ theme }) => theme.colours.light};
  display: flex;
  border: ${({ theme, selected }) => (selected ? theme.borders.thick : theme.borders.fine)};
  box-shadow: ${({ theme }) => theme.shadow.light};
  height: 122px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};
`;

const ResponsiveImageStyled = styled(ResponsiveImage)`
  width: 140px;
  max-height: 100%;
  flex-shrink: 0;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.gutter.s};
  justify-content: space-between;
`;

const AddressLine = styled.span`
  margin-bottom: ${({ theme }) => theme.gutter.s};
`;

const PriceAndSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.font.size.s};
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colours.primary};
  margin-bottom: ${({ theme }) => theme.gutter.s};
`;

const Size = styled.span``;

export type Props = PropertyOverview & {
  className?: string;
  handleClick?: (id: string) => void;
  handleMouseEnter?: (id: string) => void;
  handleMouseLeave?: (id: string) => void;
  style?: CSSProperties;
};

export const PropertyCard: React.SFC<Props> = ({
  address,
  className,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  id,
  imgUrl,
  price,
  selected,
  size,
  style,
}) => (
  <CardContainer
    className={className}
    clickable={!!handleClick}
    onClick={() => handleClick && handleClick(id)}
    onMouseEnter={() => handleMouseEnter && handleMouseEnter(id)}
    onMouseLeave={() => handleMouseLeave && handleMouseLeave(id)}
    selected={selected}
    style={style}
  >
    <ResponsiveImageStyled src={imgUrl} />
    <CardInfo>
      <AddressLine>{address}</AddressLine>

      <PriceAndSizeContainer>
        <Price>{price}</Price>
        <Size>{size}</Size>
      </PriceAndSizeContainer>
    </CardInfo>
  </CardContainer>
);
