import React from 'react';
import styled from 'styled-components';

import { Description } from '../../../types/property';
import { ExplicitDictionary } from '../../../types/common/dictionary';

import { ResponsiveImage } from '../../../components/responsive-image/responsive-image';

import { PdpDescription } from './description';
import { PdpSpecification } from './specification';

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

const Image = styled(ResponsiveImage)`
  box-sizing: border-box;
`;

interface Props {
  readonly imgUrl: string;
  readonly sectionHeadings: ExplicitDictionary<string>;
  readonly description?: Description;
  readonly specification?: string[];
}

export const PdpBody: React.SFC<Props> = ({
  description,
  imgUrl,
  sectionHeadings,
  specification,
}) => {
  return (
    <Container>
      <LeftColumn>
        <Image src={imgUrl} />
        <PdpDescription {...description} heading={sectionHeadings.details} />
        <PdpSpecification heading={sectionHeadings.specification} specification={specification} />
      </LeftColumn>
      <RightColumn />
    </Container>
  );
};
