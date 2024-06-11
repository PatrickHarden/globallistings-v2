import React, { SFC } from 'react';
import { LoadingComponentProps } from 'react-loadable';
import styled from 'styled-components';

const Container = styled.div`
  margin: ${({ theme }) => theme.gutter.l};
  width: 38px;
  height: 38px;
`;

interface OwnProps {
  readonly fill?: string;
  readonly size?: 'small' | 'large';
}

export const Loader: SFC<OwnProps> = ({ fill = '#000', size = 'small' }) => (
  <Container>
    <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".1" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18" fill={fill}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  </Container>
);

// TODO: We should handle loadable props like retry and so + other props
export const LoadableLoader: React.SFC<OwnProps & LoadingComponentProps> = () => <Loader />;

export default Loader;
