import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: auto;
`;

interface Props {
  readonly src: string;
  readonly className?: string;
}

export const ResponsiveImage: React.SFC<Props> = ({ src, className }) => (
  <ImgContainer className={className}>
    <Img src={src} />
  </ImgContainer>
);
