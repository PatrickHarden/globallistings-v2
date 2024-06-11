import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

const Heading = styled.a`
  color: #006a4d;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.2em;
  font-weight: normal;
  @media (min-width: 768px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

interface Props {
  readonly children: ReactNode;
}

interface State {
  readonly hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public readonly state = { hasError: false };

  public componentDidCatch(error: Error, info: object) {
    this.setState({ hasError: true });
    // TODO: update with call to Sentry.io
    console.log(error, info);
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // TODO: update the error message with something more meaningful
      return <Heading>Something went wrong.</Heading>;
    }
    return children;
  }
}

export default ErrorBoundary;
